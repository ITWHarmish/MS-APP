import { google } from "googleapis";

import UserAccessModel from "../models/userAccess";
import { IResponse } from "../types/IResponse";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);

export const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
];

export const getGoogleDrive = async (uid: string) => {
  const result: any = await UserAccessModel.findOne({ uid: uid });
  oauth2Client.setCredentials(result.google);
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  return drive;
};

export const getCalender = async (uid: string) => {
  const result: any = await UserAccessModel.findOne({ uid: uid });
  oauth2Client.setCredentials(result.google);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  return calendar;
};

export function parseError(error: any): IResponse {
  const result: IResponse = {
    code: 500,
    data: null,
  };

  if (error.failure && error.failure.details) {
    result.data = error.failure.details;
  } else if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    result.code = error.response.status;
    result.data = error.response.data;
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    result.data = error.request;
  } else if (error.message) {
    // Something happened in setting up the request and triggered an Error
    result.data = error.message;
  } else {
    result.data = error.toString();
  }

  return result;
}
