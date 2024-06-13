"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelogChange = exports.TaskChange = void 0;
const socket_1 = __importDefault(require("./socket"));
const TaskChange = () => {
    const connection = socket_1.default.connection();
    if (connection)
        connection.emit("task-change");
};
exports.TaskChange = TaskChange;
const TimelogChange = () => {
    const connection = socket_1.default.connection();
    if (connection)
        connection.emit("timelog-change");
};
exports.TimelogChange = TimelogChange;
