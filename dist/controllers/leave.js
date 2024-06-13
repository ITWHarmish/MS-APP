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
exports.deleteLeave = exports.updateLeave = exports.createLeave = exports.readLeave = void 0;
const leave_1 = __importDefault(require("../models/leave"));
const readLeave = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const allLeave = yield leave_1.default.find({ userId: uid });
    return allLeave;
});
exports.readLeave = readLeave;
const createLeave = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const leaveCreated = new leave_1.default(payload);
    yield leaveCreated.save();
    return leaveCreated;
});
exports.createLeave = createLeave;
const updateLeave = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield leave_1.default.findByIdAndUpdate(id, payload, { new: true });
});
exports.updateLeave = updateLeave;
const deleteLeave = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield leave_1.default.findByIdAndDelete(id);
});
exports.deleteLeave = deleteLeave;
