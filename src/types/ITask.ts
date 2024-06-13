import { Document } from "mongoose";

export interface ITaskHistory {
  change: string;
  by: string;
  at: string;
}

export interface ITaskComments {
  comment: string;
  by: string;
  at: string;
}

export interface ITask extends Document {
  tid: string;
  project: string;
  title: string;
  description: string;
  assignedto: string;
  developer: string;
  startdate: Date;
  duedate: Date;
  status: string;
  priority: string;
  label: string;
  comments: Array<ITaskComments>;
  history: Array<ITaskHistory>;
}
