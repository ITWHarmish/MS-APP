import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../types/ICompany';

const companySchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    owner: { type: Schema.Types.String },
    industryType: { type: Schema.Types.String },
    location: {
      type: Schema.Types.String,
    },
    webiste: { type: Schema.Types.String },
    contact: {
      email: { type: Schema.Types.String },
      countryCode: { type: Schema.Types.String },
      phone: { type: Schema.Types.String },
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<ICompany>('Company', companySchema, 'companys');
