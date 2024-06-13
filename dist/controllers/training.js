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
exports.deleteTraining = exports.updateTraining = exports.createTraining = exports.trainingList = void 0;
const training_1 = __importDefault(require("../models/training"));
const trainingList = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield training_1.default.find();
    return result;
});
exports.trainingList = trainingList;
const createTraining = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trainingData = new training_1.default(payload);
    yield trainingData.save();
    return trainingData;
});
exports.createTraining = createTraining;
const updateTraining = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield training_1.default.findByIdAndUpdate(id, payload, { new: true });
});
exports.updateTraining = updateTraining;
const deleteTraining = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield training_1.default.findByIdAndRemove(id);
});
exports.deleteTraining = deleteTraining;
