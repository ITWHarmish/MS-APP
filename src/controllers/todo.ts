import ToDoModel from "../models/todo";
import { IToDo } from "../types/IToDo";

export const getToDoList = async (uid: string) => {
  const result: IToDo[] = await ToDoModel.find({ userId: uid });
  return result;
};

export const createToDo = async (payload: IToDo) => {
  const todoData: IToDo = new ToDoModel(payload);
  await todoData.save();
  return todoData;
};

export const updateToDo = async (id: string, payload: IToDo) => {
  await ToDoModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteToDo = async (id: string) => {
  await ToDoModel.findByIdAndRemove(id);
};
