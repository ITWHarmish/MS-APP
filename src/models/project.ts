import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types/IProject';
import * as enums from '../utils/enums';

const ProjectSchema: Schema = new Schema(
  {
    pid: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    company: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    status: {
      type: Schema.Types.String,
      enum: enums.ProjectStatus,
      required: true,
    },
    leader: { type: Schema.Types.String },
    developers: [{ type: Schema.Types.String }],
    category: { type: Schema.Types.String },
    skills: [{ type: Schema.Types.String }],
    priority: { type: Schema.Types.String },
    deadline: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IProject>('Project', ProjectSchema, 'projects');
