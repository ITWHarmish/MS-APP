import ProjectModel from '../models/project';
import { IProject } from '../types/IProject';

export const readProject = async () => {
  const projects: IProject[] = await ProjectModel.find({}).sort({ name: 1 });
  return projects;
};

export const createProject = async (payload: IProject) => {
  const ProjectData: IProject = new ProjectModel(payload);
  await ProjectData.save();
  return ProjectData;
};

export const updateProject = async (id: string, payload: IProject) => {
  await ProjectModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteProject = async (id: string) => {
  await ProjectModel.findByIdAndRemove(id);
};
