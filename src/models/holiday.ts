import mongoose, { Schema } from 'mongoose';
import { IHoliday } from '../types/IHoliday';

const holidaySchema = new Schema({
  title: { type: Schema.Types.String },
  date: { type: Schema.Types.String },
  year: { type: Schema.Types.String, required: true },
});

export default mongoose.model<IHoliday>('Holiday', holidaySchema, 'holidays');
