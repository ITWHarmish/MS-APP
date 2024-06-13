"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportMonthlyTimelog = void 0;
const firestore_1 = require("firebase/firestore");
const moment_1 = __importDefault(require("moment"));
const firebase_1 = require("../firebase");
const timelog_1 = require("./timelog");
const timelog_2 = __importDefault(require("../models/timelog"));
const sumArray = (array) => {
    return array.reduce((partialSum, a) => partialSum + a, 0);
};
const getTimelog = (uid, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const timelogs = yield timelog_2.default.aggregate([
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
});
const getTotalHours = (timelogs) => __awaiter(void 0, void 0, void 0, function* () {
    const codingHoursArray = [];
    const managementHoursArray = [];
    const projectManagementHoursArray = [];
    const reviewHoursArray = [];
    const learningHoursArray = [];
    const trainingHoursArray = [];
    const interviewHoursArray = [];
    const billableHoursArray = [];
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
                if (timelog.project)
                    projectManagementHoursArray.push(parseFloat(hours.toFixed(2)));
                else
                    managementHoursArray.push(parseFloat(hours.toFixed(2)));
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
    const TotalHours = (CodingHours +
        ManagementHours +
        ProjectManagementHours +
        ReviewHours +
        LearningHours +
        TrainingHours +
        InterviewHours).toFixed(2);
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
});
const reportMonthlyTimelog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = [];
    const timelog = [];
    const startDate = (0, moment_1.default)(new Date(payload.startDate)).format('MM-DD-YYYY');
    const endDate = (0, moment_1.default)(new Date(payload.endDate)).format('MM-DD-YYYY');
    const docsSnap = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'users'));
    docsSnap.forEach((doc) => __awaiter(void 0, void 0, void 0, function* () {
        const docData = doc.data();
        if (!docData.endDate) {
            allUsers.push({
                id: doc.id,
                name: docData.firstName + ' ' + docData.lastName,
            });
        }
    }));
    yield Promise.all(allUsers.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const hoursProject = yield (0, timelog_1.projectHours)(user.id, startDate, endDate);
        const totalProjectHours = [];
        hoursProject.forEach((hour) => totalProjectHours.push(parseFloat(hour.total)));
        const timelogs = yield getTimelog(user.id, startDate, endDate);
        const hoursTotal = yield getTotalHours(timelogs);
        const newUser = Object.assign(Object.assign({}, user), { hours: {
                project: hoursProject,
                total: Object.assign(Object.assign({}, hoursTotal), { projectTotal: parseFloat(sumArray(totalProjectHours).toFixed(2)) }),
            } });
        timelog.push(newUser);
    })));
    return timelog;
});
exports.reportMonthlyTimelog = reportMonthlyTimelog;
