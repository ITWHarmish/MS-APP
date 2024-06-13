import HolidayModal from '../models/holiday';
import { IHoliday } from '../types/IHoliday';

export const readHoliday = async () => {
  const result: IHoliday[] = await HolidayModal.find().sort({ date: 1 });
  return result;
};

export const createHoliday = async (payload: IHoliday) => {
  const holidayData: IHoliday = new HolidayModal(payload);
  await holidayData.save();
  return holidayData;
};

export const updateHoliday = async (id: string, payload: IHoliday) => {
  await HolidayModal.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteHoliday = async (id: string) => {
  await HolidayModal.findByIdAndRemove(id);
};
