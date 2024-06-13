import { Document } from 'mongoose';

export interface IBlog extends Document {
  id?: string;
  title: string;
  richText: string;
  Image: any;
}
