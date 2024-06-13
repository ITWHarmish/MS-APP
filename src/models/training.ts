import mongoose, { Schema } from 'mongoose';
import { ITraining } from '../types/ITraining';

const trainingSchema: Schema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },
    mentorName: {
      type: Schema.Types.String,
      require: true,
    },
    startDate: {
      type: Schema.Types.Date,
    },
    endDate: {
      type: Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITraining>('Training', trainingSchema, 'trainings');