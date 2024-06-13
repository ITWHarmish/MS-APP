import mongoose, { Schema } from 'mongoose';
import { ILeave } from '../types/ILeave';

const leaveSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    },
    noOfDays: {
      type: Number
    },
    leavetype: {
      type: String
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending"
    }
  }
);

export default mongoose.model<ILeave>('Leave', leaveSchema, 'leaves');