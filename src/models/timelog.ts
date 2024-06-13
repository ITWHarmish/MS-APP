import mongoose, { Schema } from 'mongoose';
import { ITimelog } from '../types/ITimelog';

const TimelogSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.String },
    date: { type: Schema.Types.String },
    startTime: { type: Schema.Types.String },
    endTime: { type: Schema.Types.String },
    category: { type: Schema.Types.String },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    description: { type: Schema.Types.String },
    billable: { type: Schema.Types.Boolean },
    task_id: { type: Schema.Types.String },
  },
  { timestamps: true },
);

export default mongoose.model<ITimelog>('Timelog', TimelogSchema, 'timelogs');
