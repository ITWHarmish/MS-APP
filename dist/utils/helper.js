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
exports.parseError = exports.getCalender = exports.getGoogleDrive = exports.scopes = exports.oauth2Client = void 0;
const googleapis_1 = require("googleapis");
const userAccess_1 = __importDefault(require("../models/userAccess"));
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
exports.scopes = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.events.readonly",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
];
const getGoogleDrive = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userAccess_1.default.findOne({ uid: uid });
    exports.oauth2Client.setCredentials(result.google);
    const drive = googleapis_1.google.drive({ version: "v3", auth: exports.oauth2Client });
    return drive;
});
exports.getGoogleDrive = getGoogleDrive;
const getCalender = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userAccess_1.default.findOne({ uid: uid });
    exports.oauth2Client.setCredentials(result.google);
    const calendar = googleapis_1.google.calendar({ version: "v3", auth: exports.oauth2Client });
    return calendar;
});
exports.getCalender = getCalender;
function parseError(error) {
    const result = {
        code: 500,
        data: null,
    };
    if (error.failure && error.failure.details) {
        result.data = error.failure.details;
    }
    else if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        result.code = error.response.status;
        result.data = error.response.data;
    }
    else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        result.data = error.request;
    }
    else if (error.message) {
        // Something happened in setting up the request and triggered an Error
        result.data = error.message;
    }
    else {
        result.data = error.toString();
    }
    return result;
}
exports.parseError = parseError;
