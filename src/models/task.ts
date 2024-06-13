import mongoose, { Schema } from "mongoose";

import { ITask } from "../types/ITask";

const TaskSchema: Schema = new Schema(
  {
    tid: {
      type: Schema.Types.String,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    title: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    assignedTo: {
      type: Schema.Types.String,
    },
    developer: {
      type: Schema.Types.String,
    },
    startDate: {
      type: Schema.Types.Date,
    },
    dueDate: {
      type: Schema.Types.Date,
    },
    status: {
      type: Schema.Types.String,
    },
    priority: {
      type: Schema.Types.String,
    },
    label: {
      type: Schema.Types.String,
    },
    comments: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          auto: true,
        },
        comment: {
          type: Schema.Types.String,
        },
        by: {
          type: Schema.Types.String,
        },
        at: {
          type: Schema.Types.String,
        },
      },
    ],
    history: [
      {
        change: Schema.Types.String,
        by: Schema.Types.String,
        at: Schema.Types.String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ITask>('Task', TaskSchema, 'tasks');
