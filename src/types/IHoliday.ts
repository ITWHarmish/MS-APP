import { Document } from 'mongoose';

export interface IHoliday extends Document {
  title: string;
  date: Date;
  year: string;
};