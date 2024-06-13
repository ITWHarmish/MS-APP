import TrainingModel from '../models/training';
import { ITraining } from '../types/ITraining';

export const trainingList = async () => {
  const result: ITraining[] = await TrainingModel.find();
  return result;
};

export const createTraining = async (payload: ITraining) => {
  const trainingData: ITraining = new TrainingModel(payload);
  await trainingData.save();
  return trainingData;
}

export const updateTraining = async (id: string, payload: ITraining) => {
  await TrainingModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteTraining = async (id: string) => {
  await TrainingModel.findByIdAndRemove(id);
};
