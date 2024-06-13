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
exports.deleteProject = exports.updateProject = exports.createProject = exports.readProject = void 0;
const project_1 = __importDefault(require("../models/project"));
const readProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find({}).sort({ name: 1 });
    return projects;
});
exports.readProject = readProject;
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectData = new project_1.default(payload);
    yield ProjectData.save();
    return ProjectData;
});
exports.createProject = createProject;
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_1.default.findByIdAndUpdate(id, payload, { new: true });
});
exports.updateProject = updateProject;
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_1.default.findByIdAndRemove(id);
});
exports.deleteProject = deleteProject;
