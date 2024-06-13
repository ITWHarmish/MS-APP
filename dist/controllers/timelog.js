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
exports.uploadTimelogToDrive = exports.projectHours = exports.getTimelogHours = exports.getTotalHours = exports.deleteTimelog = exports.updateTimelog = exports.createTimelog = exports.readTimelog = exports.getAllTimelogs = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const change_list_1 = require("../change-list");
const timelog_1 = __importDefault(require("../models/timelog"));
const helper_1 = require("../utils/helper");
const getAllTimelogs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = moment_1.default.utc(payload.startDate).toISOString();
    const endDate = moment_1.default.utc(payload.endDate).toISOString();
    const timelogs = yield timelog_1.default.find({
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
});
exports.getAllTimelogs = getAllTimelogs;
const readTimelog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const timelogs = yield timelog_1.default.find({
        userId: query.uid,
    })
        .sort({
        startTime: 1,
    })
        .populate("project", "name");
    return timelogs.filter((item) => (0, moment_1.default)(item.date).format("L") === moment_1.default.unix(query.date).format("L"));
});
exports.readTimelog = readTimelog;
const createTimelog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const TimelogData = new timelog_1.default(payload);
    yield TimelogData.save();
    (0, change_list_1.TimelogChange)();
    return TimelogData;
});
exports.createTimelog = createTimelog;
const updateTimelog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield timelog_1.default.findByIdAndUpdate(id, payload);
    (0, change_list_1.TimelogChange)();
});
exports.updateTimelog = updateTimelog;
const deleteTimelog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield timelog_1.default.findByIdAndRemove(id);
    (0, change_list_1.TimelogChange)();
});
exports.deleteTimelog = deleteTimelog;
const getTotalHours = (uid, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const timelogs = yield timelog_1.default.aggregate([
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
    const codingHoursArray = [];
    const managementHoursArray = [];
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
    const sumArray = (array) => {
        return array.reduce((partialSum, a) => partialSum + a, 0);
    };
    const CodingHours = parseFloat(sumArray(codingHoursArray).toFixed(2));
    const BillableHours = parseFloat(sumArray(billableHoursArray).toFixed(2));
    const ManagementHours = parseFloat(sumArray(managementHoursArray).toFixed(2));
    const ReviewHours = parseFloat(sumArray(reviewHoursArray).toFixed(2));
    const LearningHours = parseFloat(sumArray(learningHoursArray).toFixed(2));
    const TrainingHours = parseFloat(sumArray(trainingHoursArray).toFixed(2));
    const InterviewHours = parseFloat(sumArray(interviewHoursArray).toFixed(2));
    const TotalHours = (CodingHours +
        ManagementHours +
        ReviewHours +
        LearningHours +
        TrainingHours +
        InterviewHours).toFixed(2);
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
});
exports.getTotalHours = getTotalHours;
const getTimelogHours = (uid, date) => __awaiter(void 0, void 0, void 0, function* () {
    const fromDate = new Date(new Date(date).setUTCHours(24, 0, 0, 0)).toISOString();
    const toDate = new Date(new Date(fromDate).setUTCHours(24, 0, 0, 0)).toISOString();
    const timelogs = yield timelog_1.default.aggregate([
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
    const codingHoursArray = [];
    const managementHoursArray = [];
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
    const sumArray = (array) => {
        return array.reduce((partialSum, a) => partialSum + a, 0);
    };
    const CodingHours = parseFloat(sumArray(codingHoursArray).toFixed(2));
    const BillableHours = parseFloat(sumArray(billableHoursArray).toFixed(2));
    const ManagementHours = parseFloat(sumArray(managementHoursArray).toFixed(2));
    const ReviewHours = parseFloat(sumArray(reviewHoursArray).toFixed(2));
    const LearningHours = parseFloat(sumArray(learningHoursArray).toFixed(2));
    const TrainingHours = parseFloat(sumArray(trainingHoursArray).toFixed(2));
    const InterviewHours = parseFloat(sumArray(interviewHoursArray).toFixed(2));
    const TotalHours = (CodingHours +
        ManagementHours +
        ReviewHours +
        LearningHours +
        TrainingHours +
        InterviewHours).toFixed(2);
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
});
exports.getTimelogHours = getTimelogHours;
const projectHours = (uid, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const timelogs = yield timelog_1.default.aggregate([
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
    return timelogs.map((t) => {
        return {
            total: t.total.toFixed(2),
            project: {
                id: t.project[0]._id,
                name: t.project[0].name,
            },
        };
    });
});
exports.projectHours = projectHours;
const uploadTimelogToDrive = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield (0, helper_1.getGoogleDrive)(uid);
    const requestBody = {
        name: "photo.jpg",
        fields: "id",
        parents: ["1uaaBfhFKiAli8Jfu-SHn_c8tCA9slLvq"], // upload folder id
    };
    const media = {
        mimeType: "image/jpeg",
        body: fs_1.default.createReadStream("files/photo.jpg"),
    };
    try {
        const file = yield service.files.create({
            requestBody,
            media: media,
            supportsAllDrives: true,
        });
        console.log("File data:", file.data);
        return { id: file.data.id };
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.uploadTimelogToDrive = uploadTimelogToDrive;
