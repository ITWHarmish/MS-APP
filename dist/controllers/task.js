"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistory = exports.deleteComment = exports.updateComment = exports.createComment = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTask = exports.getPaginatedTask = void 0;
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
const change_list_1 = require("../change-list");
const project_1 = __importDefault(require("../models/project"));
const task_1 = __importDefault(require("../models/task"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const getPaginatedTask = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { results, page, filter } = params;
    const match = {
        status: { $in: filter.status },
    };
    if (filter.project)
        match.project = new ObjectId(filter.project);
    if (filter.assignee)
        match.assignedTo = filter.assignee;
    if (filter.search)
        match.title = { $regex: filter.search };
    const tasks = yield task_1.default.aggregate([
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
    const total = yield task_1.default.count(Object.assign({}, match));
    const result = { total: total, data: tasks };
    return result;
});
exports.getPaginatedTask = getPaginatedTask;
const getAllTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.default.aggregate([
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
});
exports.getAllTask = getAllTask;
const getTaskById = (tid) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.default.aggregate([
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
});
exports.getTaskById = getTaskById;
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = new mongoose_1.default.Types.ObjectId(payload.project);
    const lastTask = yield task_1.default.findOne({ project: projectId }).sort({ createdAt: -1 });
    let lastID = 1;
    let token;
    if (lastTask) {
        const splitID = lastTask.tid.split("-", 2);
        lastID = parseInt(splitID[1]) + 1;
        token = splitID[0] + "-" + lastID;
    }
    else {
        const project = yield project_1.default.findById(payload.project);
        token = project.pid + "-" + lastID;
    }
    const data = Object.assign({ tid: token }, payload);
    const taskData = new task_1.default(data);
    yield taskData.save();
    (0, change_list_1.TaskChange)();
    return taskData;
});
exports.createTask = createTask;
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield task_1.default.findByIdAndUpdate(id, payload, { new: true });
    (0, change_list_1.TaskChange)();
});
exports.updateTask = updateTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield task_1.default.findByIdAndRemove(id);
    (0, change_list_1.TaskChange)();
});
exports.deleteTask = deleteTask;
const createComment = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const commentAdd = { comment: payload.comment, by: payload.by, at: (0, moment_1.default)().format() };
    const task = yield task_1.default.findOne({ _id: taskId });
    task.comments.push(commentAdd);
    yield task.save();
    return task;
});
exports.createComment = createComment;
const updateComment = (taskId, commentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield task_1.default.findOneAndUpdate({ _id: taskId, "commentdata._id": commentId }, { $set: { "commentdata.$.comment": payload.comment } }, { new: true });
});
exports.updateComment = updateComment;
const deleteComment = (taskId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield task_1.default.findByIdAndUpdate({ _id: taskId }, { $pull: { commentdata: { _id: { $in: [commentId] } } } }, { new: true });
});
exports.deleteComment = deleteComment;
const createHistory = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const history = { change: payload.change, by: payload.by, at: (0, moment_1.default)().format() };
    const task = yield task_1.default.findOne({ _id: taskId });
    task.history.push(history);
    yield task.save();
    return task;
});
exports.createHistory = createHistory;
