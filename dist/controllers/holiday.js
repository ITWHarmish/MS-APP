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
exports.deleteHoliday = exports.updateHoliday = exports.createHoliday = exports.readHoliday = void 0;
const holiday_1 = __importDefault(require("../models/holiday"));
const readHoliday = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield holiday_1.default.find().sort({ date: 1 });
    return result;
});
exports.readHoliday = readHoliday;
const createHoliday = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const holidayData = new holiday_1.default(payload);
    yield holidayData.save();
    return holidayData;
});
exports.createHoliday = createHoliday;
const updateHoliday = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield holiday_1.default.findByIdAndUpdate(id, payload, { new: true });
});
exports.updateHoliday = updateHoliday;
const deleteHoliday = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield holiday_1.default.findByIdAndRemove(id);
});
exports.deleteHoliday = deleteHoliday;
