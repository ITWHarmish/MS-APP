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
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.readCompany = void 0;
const company_1 = __importDefault(require("../models/company"));
const readCompany = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield company_1.default.find();
    return result;
});
exports.readCompany = readCompany;
const createCompany = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const companyData = new company_1.default(payload);
    yield companyData.save();
    return companyData;
});
exports.createCompany = createCompany;
const updateCompany = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield company_1.default.findByIdAndUpdate(id, payload, { new: true });
});
exports.updateCompany = updateCompany;
const deleteCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield company_1.default.findByIdAndRemove(id);
});
exports.deleteCompany = deleteCompany;
