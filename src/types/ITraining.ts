import { Document } from 'mongoose';

export interface ITraining extends Document {
  firstName: string;
  lastName: string;
  mentorName: string;
  startDate: string;
  endDate: string;
}
