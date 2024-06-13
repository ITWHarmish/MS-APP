import fs from "fs";
import moment from "moment";

import { TimelogChange } from "../change-list";
import TimelogModel from "../models/timelog";
import { ITimelog } from "../types/ITimelog";
import { getGoogleDrive } from "../utils/helper";

export const getAllTimelogs = async (payload: any) => {
  const startDate = moment.utc(payload.startDate).toISOString();
  const endDate = moment.utc(payload.endDate).toISOString();

  const timelogs: ITimelog[] = await TimelogModel.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .sort({
      startTime: 1,
    })
    .populate("project", "name");
  return timelogs;
};

export const readTimelog = async (query: any) => {
  const timelogs: ITimelog[] = await TimelogModel.find({
    userId: query.uid,
  })
    .sort({
      startTime: 1,
    })
    .populate("project", "name");

  return timelogs.filter((item: any) => moment(item.date).format("L") === moment.unix(query.date).format("L"));
};

export const createTimelog = async (payload: ITimelog) => {
  const TimelogData: ITimelog = new TimelogModel(payload);
  await TimelogData.save();
  TimelogChange();
  return TimelogData;
};

export const updateTimelog = async (id: string, payload: ITimelog) => {
  await TimelogModel.findByIdAndUpdate(id, payload);
  TimelogChange();
};

export const deleteTimelog = async (id: string) => {
  await TimelogModel.findByIdAndRemove(id);
  TimelogChange();
};

export const getTotalHours = async (uid: string, startDate: string, endDate: string) => {
  const timelogs: ITimelog[] = await TimelogModel.aggregate([
    {
      $match: {
        userId: uid,
      },
    },
    {
      $addFields: {
        Idate: {
          $dateFromString: {
            dateString: "$date",
          },
        },
      },
    },
    {
      $match: {
        Idate: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
  ]);

  const codingHoursArray: Array<number> = [];
  const managementHoursArray: Array<number> = [];
  const reviewHoursArray: Array<number> = [];
  const learningHoursArray: Array<number> = [];
  const trainingHoursArray: Array<number> = [];
  const interviewHoursArray: Array<number> = [];
  const billableHoursArray: Array<number> = [];

  timelogs.forEach((timelog) => {
    const startTime = new Date(timelog.startTime).getTime();
    const endTime = new Date(timelog.endTime).getTime();
    const hours = (Math.abs(endTime - startTime) / (1000 * 60 * 60)) % 24;

    if (timelog.billable) {
      billableHoursArray.push(parseFloat(hours.toFixed(2)));
    }

    switch (timelog.category) {
      case "coding":
        codingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "management":
        managementHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "review":
        reviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "learning":
        learningHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "training":
        trainingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "interview":
        interviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      default:
        break;
    }
  });

  const sumArray = (array: Array<number>) => {
    return array.reduce((partialSum, a) => partialSum + a, 0);
  };

  const CodingHours = parseFloat(sumArray(codingHoursArray).toFixed(2));
  const BillableHours = parseFloat(sumArray(billableHoursArray).toFixed(2));
  const ManagementHours = parseFloat(sumArray(managementHoursArray).toFixed(2));
  const ReviewHours = parseFloat(sumArray(reviewHoursArray).toFixed(2));
  const LearningHours = parseFloat(sumArray(learningHoursArray).toFixed(2));
  const TrainingHours = parseFloat(sumArray(trainingHoursArray).toFixed(2));
  const InterviewHours = parseFloat(sumArray(interviewHoursArray).toFixed(2));

  const TotalHours = (
    CodingHours +
    ManagementHours +
    ReviewHours +
    LearningHours +
    TrainingHours +
    InterviewHours
  ).toFixed(2);

  const timelogHours = {
    total: TotalHours,
    billable: BillableHours,
    coding: CodingHours,
    management: ManagementHours,
    review: ReviewHours,
    learning: LearningHours,
    training: TrainingHours,
    interview: InterviewHours,
  };
  return timelogHours;
};

export const getTimelogHours = async (uid: string, date: string) => {
  const fromDate = new Date(new Date(date).setUTCHours(24, 0, 0, 0)).toISOString();
  const toDate = new Date(new Date(fromDate).setUTCHours(24, 0, 0, 0)).toISOString();

  const timelogs: ITimelog[] = await TimelogModel.aggregate([
    {
      $match: {
        userId: uid,
        date: {
          $gt: fromDate,
          $lte: toDate,
        },
      },
    },
  ]);

  const codingHoursArray: Array<number> = [];
  const managementHoursArray: Array<number> = [];
  const reviewHoursArray: Array<number> = [];
  const learningHoursArray: Array<number> = [];
  const trainingHoursArray: Array<number> = [];
  const interviewHoursArray: Array<number> = [];
  const billableHoursArray: Array<number> = [];

  timelogs.forEach((timelog) => {
    const startTime = new Date(timelog.startTime).getTime();
    const endTime = new Date(timelog.endTime).getTime();
    const hours = (Math.abs(endTime - startTime) / (1000 * 60 * 60)) % 24;

    if (timelog.billable) {
      billableHoursArray.push(parseFloat(hours.toFixed(2)));
    }

    switch (timelog.category) {
      case "coding":
        codingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "management":
        managementHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "review":
        reviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "learning":
        learningHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "training":
        trainingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case "interview":
        interviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      default:
        break;
    }
  });

  const sumArray = (array: Array<number>) => {
    return array.reduce((partialSum, a) => partialSum + a, 0);
  };

  const CodingHours = parseFloat(sumArray(codingHoursArray).toFixed(2));
  const BillableHours = parseFloat(sumArray(billableHoursArray).toFixed(2));
  const ManagementHours = parseFloat(sumArray(managementHoursArray).toFixed(2));
  const ReviewHours = parseFloat(sumArray(reviewHoursArray).toFixed(2));
  const LearningHours = parseFloat(sumArray(learningHoursArray).toFixed(2));
  const TrainingHours = parseFloat(sumArray(trainingHoursArray).toFixed(2));
  const InterviewHours = parseFloat(sumArray(interviewHoursArray).toFixed(2));

  const TotalHours = (
    CodingHours +
    ManagementHours +
    ReviewHours +
    LearningHours +
    TrainingHours +
    InterviewHours
  ).toFixed(2);

  const timelogHours = {
    userId: uid,
    total: TotalHours,
    billable: BillableHours,
    coding: CodingHours,
    management: ManagementHours,
    review: ReviewHours,
    learning: LearningHours,
    training: TrainingHours,
    interview: InterviewHours,
    date: date,
  };
  return timelogHours;
};

export const projectHours = async (uid: string, startDate: string, endDate: string) => {
  const timelogs: ITimelog[] = await TimelogModel.aggregate([
    {
      $match: {
        userId: uid,
        project: {
          $exists: true,
        },
      },
    },
    {
      $addFields: {
        Idate: {
          $dateFromString: {
            dateString: "$date",
          },
        },
        IStartTime: {
          $dateFromString: {
            dateString: "$startTime",
          },
        },
        IEndTime: {
          $dateFromString: {
            dateString: "$endTime",
          },
        },
      },
    },
    {
      $match: {
        Idate: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    {
      $project: {
        project: 1,
        duration: {
          $divide: [
            {
              $subtract: ["$IEndTime", "$IStartTime"],
            },
            3600000,
          ],
        },
      },
    },
    {
      $group: {
        _id: "$project",
        total: {
          $sum: "$duration",
        },
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "_id",
        as: "project",
      },
    },
  ]);

  return timelogs.map((t: any) => {
    return {
      total: t.total.toFixed(2),
      project: {
        id: t.project[0]._id,
        name: t.project[0].name,
      },
    };
  });
};

export const uploadTimelogToDrive = async (uid: string) => {
  const service = await getGoogleDrive(uid);

  const requestBody = {
    name: "photo.jpg",
    fields: "id",
    parents: ["1uaaBfhFKiAli8Jfu-SHn_c8tCA9slLvq"], // upload folder id
  };

  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("files/photo.jpg"),
  };

  try {
    const file = await service.files.create({
      requestBody,
      media: media,
      supportsAllDrives: true,
    });
    console.log("File data:", file.data);
    return { id: file.data.id };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
