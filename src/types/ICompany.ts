import { Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  owner: string;
  industryType: string;
  location: string;
  webiste: string;
  contact: {
    email: string;
    countryCode: string;
    phone: string;
  };
}
