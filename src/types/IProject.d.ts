import { Document } from 'mongoose';
import { EnumType } from 'typescript';

export interface IProject extends Document {
  pid: string;
  name: string;
  company: string;
  description: any;
  status: EnumType;
  manager: string;
  leader: string;
  developers: Array<string>;
  category: string;
  skills: Array<string>;
  priority: EnumType;
  deadline: string;
}
