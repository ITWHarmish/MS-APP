import moment from "moment";
import mongoose from "mongoose";

import { TaskChange } from "../change-list";
import Project from "../models/project";
import TaskModel from "../models/task";
import { ITask, ITaskComments, ITaskHistory } from "../types/ITask";

const ObjectId = mongoose.Types.ObjectId;

export const getPaginatedTask = async (params) => {
  const { results, page, filter } = params;

  const match: any = {
    status: { $in: filter.status },
  };

  if (filter.project) match.project = new ObjectId(filter.project);
  if (filter.assignee) match.assignedTo = filter.assignee;
  if (filter.search) match.title = { $regex: filter.search };

  const tasks = await TaskModel.aggregate([
    {
      $match: match,
    },
    {
      $sort: {
        dueDate: 1,
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "timelogs",
        localField: "tid",
        foreignField: "task_id",
        as: "timelog",
      },
    },
    { $skip: Number(results) * (page - 1) },
    { $limit: Number(results) },
  ]);

  const total = await TaskModel.count({ ...match });

  const result = { total: total, data: tasks };

  return result;
};

export const getAllTask = async () => {
  const tasks: ITask[] = await TaskModel.aggregate([
    { $match: { status: { $in: ["in progress", "in review"] } } },
    {
      $sort: {
        dueDate: 1,
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "timelogs",
        localField: "tid",
        foreignField: "task_id",
        as: "timelog",
      },
    },
  ]);
  return tasks;
};

export const getTaskById = async (tid: string) => {
  const tasks: ITask[] = await TaskModel.aggregate([
    { $match: { tid } },
    {
      $lookup: {
        from: "timelogs",
        localField: "tid",
        foreignField: "task_id",
        as: "timelog",
      },
    },
  ]);
  return tasks[0];
};

export const createTask = async (payload: ITask) => {
  const projectId = new mongoose.Types.ObjectId(payload.project);

  const lastTask = await TaskModel.findOne({ project: projectId }).sort({ createdAt: -1 });

  let lastID: number = 1;
  let token: string;

  if (lastTask) {
    const splitID = lastTask.tid.split("-", 2);
    lastID = parseInt(splitID[1]) + 1;
    token = splitID[0] + "-" + lastID;
  } else {
    const project = await Project.findById(payload.project);
    token = project.pid + "-" + lastID;
  }

  const data = {
    tid: token,
    ...payload,
  };

  const taskData: ITask = new TaskModel(data);
  await taskData.save();

  TaskChange();

  return taskData;
};

export const updateTask = async (id: string, payload: ITask) => {
  await TaskModel.findByIdAndUpdate(id, payload, { new: true });
  TaskChange();
};

export const deleteTask = async (id: string) => {
  await TaskModel.findByIdAndRemove(id);
  TaskChange();
};

export const createComment = async (taskId: string, payload: ITaskComments) => {
  const commentAdd: ITaskComments = { comment: payload.comment, by: payload.by, at: moment().format() };

  const task = await TaskModel.findOne({ _id: taskId });
  task.comments.push(commentAdd);
  await task.save();
  return task;
};

export const updateComment = async (taskId: string, commentId: string, payload: ITaskComments) => {
  await TaskModel.findOneAndUpdate(
    { _id: taskId, "commentdata._id": commentId },
    { $set: { "commentdata.$.comment": payload.comment } },
    { new: true },
  );
};

export const deleteComment = async (taskId: string, commentId: string) => {
  await TaskModel.findByIdAndUpdate(
    { _id: taskId },
    { $pull: { commentdata: { _id: { $in: [commentId] } } } },
    { new: true },
  );
};

export const createHistory = async (taskId: string, payload: ITaskHistory) => {
  const history: ITaskHistory = { change: payload.change, by: payload.by, at: moment().format() };

  const task = await TaskModel.findOne({ _id: taskId });
  task.history.push(history);
  await task.save();
  return task;
};
