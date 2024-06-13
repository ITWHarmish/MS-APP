import CompanyModel from '../models/company';
import { ICompany } from '../types/ICompany';

export const readCompany = async () => {
  const result: ICompany[] = await CompanyModel.find();
  return result;
};

export const createCompany = async (payload: ICompany) => {
  const companyData: ICompany = new CompanyModel(payload);
  await companyData.save();
  return companyData;
};

export const updateCompany = async (id: string, payload: ICompany) => {
  await CompanyModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteCompany = async (id: string) => {
  await CompanyModel.findByIdAndRemove(id);
};
