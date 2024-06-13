import mongoose, { Schema } from 'mongoose';
import { ITeam } from '../types/ITeam';

const teamSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    section: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<ITeam>('Team', teamSchema, 'team');
