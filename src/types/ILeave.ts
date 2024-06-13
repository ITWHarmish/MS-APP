import { Document } from 'mongoose';

export interface ILeave extends Document {
  userId: string;
  from: Date;
  to: Date;
  noOfDays?: number;
  leavetype: string;
  reason: string;
  status?: string;
}
