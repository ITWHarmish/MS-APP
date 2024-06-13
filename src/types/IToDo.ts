import { Document } from 'mongoose';

export interface IToDo extends Document {
  userId: string;
  title: string;
  status: string;
  date: Date;
}