import TeamModel from '../models/team';
import { ITeam } from '../types/ITeam';

export const readTeam = async () => {
  const result: ITeam[] = await TeamModel.find();
  return result;
};

export const createTeam = async (payload: ITeam) => {
  const teamData: ITeam = new TeamModel(payload);
  await teamData.save();
  return teamData;
};




