import LeaveModel from "../models/leave";
import { ILeave } from '../types/ILeave';

export const readLeave = async (uid: string) => {
    const allLeave: ILeave[] = await LeaveModel.find({ userId: uid });
    return allLeave;
};

export const createLeave = async (payload: ILeave) => {
    const leaveCreated: ILeave = new LeaveModel(payload);
    await leaveCreated.save();
    return leaveCreated;
};

export const updateLeave = async (id: string, payload: ILeave) => {
    await LeaveModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteLeave = async (id: string) => {
    await LeaveModel.findByIdAndDelete(id);
};
