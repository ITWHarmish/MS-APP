import mongoose, { Schema } from "mongoose";

import { IToDo } from "../types/IToDo";

const usertodoSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IToDo>("todo", usertodoSchema, "todos");
