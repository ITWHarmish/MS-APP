import { Document } from 'mongoose';

export interface ITimelog extends Document {
  userId: string;
  category: string;
  description: string;
  project?: string;
  date: string;
  startTime: string;
  endTime: string;
  billable: boolean;
  task_id?: string;
}
