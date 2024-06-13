import UserAccessModel from "../models/userAccess";

export const gAuthMiddleware = async (req, res, next) => {
  const result: any = await UserAccessModel.findOne({ uid: req.params.uid });
  if (result && result.google) {
    next();
  } else {
    res.status(401).send("Unauthorized: Account not connected");
  }
};
