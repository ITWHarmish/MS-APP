import { Document } from 'mongoose';

export interface ITeam extends Document {
  id?: string;
  name: string;
  section: any;
}
