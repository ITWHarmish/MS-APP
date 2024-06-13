import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../firebase';
import { projectHours } from './timelog';
import { ITimelog } from '../types/ITimelog';
import TimelogModel from '../models/timelog';

const sumArray = (array: Array<number>) => {
  return array.reduce((partialSum, a) => partialSum + a, 0);
};

const getTimelog = async (uid: string, startDate: string, endDate: string) => {
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
            dateString: '$date',
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
  return timelogs;
};

const getTotalHours = async (timelogs: ITimelog[]) => {
  const codingHoursArray: Array<number> = [];
  const managementHoursArray: Array<number> = [];
  const projectManagementHoursArray: Array<number> = [];
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
      case 'coding':
        codingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case 'management':
        if (timelog.project) projectManagementHoursArray.push(parseFloat(hours.toFixed(2)));
        else managementHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case 'review':
        reviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case 'learning':
        learningHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case 'training':
        trainingHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      case 'interview':
        interviewHoursArray.push(parseFloat(hours.toFixed(2)));
        break;
      default:
        break;
    }
  });

  const CodingHours = parseFloat(sumArray(codingHoursArray).toFixed(2));
  const BillableHours = parseFloat(sumArray(billableHoursArray).toFixed(2));
  const ManagementHours = parseFloat(sumArray(managementHoursArray).toFixed(2));
  const ProjectManagementHours = parseFloat(sumArray(projectManagementHoursArray).toFixed(2));
  const ReviewHours = parseFloat(sumArray(reviewHoursArray).toFixed(2));
  const LearningHours = parseFloat(sumArray(learningHoursArray).toFixed(2));
  const TrainingHours = parseFloat(sumArray(trainingHoursArray).toFixed(2));
  const InterviewHours = parseFloat(sumArray(interviewHoursArray).toFixed(2));

  const TotalHours = (
    CodingHours +
    ManagementHours +
    ProjectManagementHours +
    ReviewHours +
    LearningHours +
    TrainingHours +
    InterviewHours
  ).toFixed(2);

  const timelogHours = {
    total: TotalHours,
    billable: BillableHours,
    coding: CodingHours,
    management: ManagementHours + ProjectManagementHours,
    otherManagement: ManagementHours,
    projectManagement: ProjectManagementHours,
    review: ReviewHours,
    learning: LearningHours,
    training: TrainingHours,
    interview: InterviewHours,
  };
  return timelogHours;
};

export const reportMonthlyTimelog = async (payload: any) => {
  const allUsers: any[] = [];
  const timelog: any[] = [];

  const startDate = moment(new Date(payload.startDate)).format('MM-DD-YYYY');
  const endDate = moment(new Date(payload.endDate)).format('MM-DD-YYYY');

  const docsSnap = await getDocs(collection(db, 'users'));

  docsSnap.forEach(async (doc) => {
    const docData = doc.data();
    if (!docData.endDate) {
      allUsers.push({
        id: doc.id,
        name: docData.firstName + ' ' + docData.lastName,
      });
    }
  });
  await Promise.all(
    allUsers.map(async (user) => {
      const hoursProject: any = await projectHours(user.id, startDate, endDate);
      const totalProjectHours = [];
      hoursProject.forEach((hour) => totalProjectHours.push(parseFloat(hour.total)));

      const timelogs: ITimelog[] = await getTimelog(user.id, startDate, endDate);
      const hoursTotal: any = await getTotalHours(timelogs);

      const newUser = {
        ...user,
        hours: {
          project: hoursProject,
          total: { ...hoursTotal, projectTotal: parseFloat(sumArray(totalProjectHours).toFixed(2)) },
        },
      };
      timelog.push(newUser);
    }),
  );
  return timelog;
};
