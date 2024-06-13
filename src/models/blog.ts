import mongoose, { Schema } from 'mongoose';
import { IBlog } from '../types/IBlog';

const blogSchema: Schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    richText: { type: Schema.Types.String },
    image: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<IBlog>('Blog', blogSchema, 'blogs');
