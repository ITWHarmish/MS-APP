import mongoose, { Schema } from "mongoose";

const UserAccessSchema: Schema = new Schema(
  {
    uid: { type: Schema.Types.String },
    google: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export default mongoose.model<any>("userAccess", UserAccessSchema, "userAccess");
