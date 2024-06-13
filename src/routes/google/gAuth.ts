import { Request, Response, Router } from "express";

import UserAccessModel from "../../models/userAccess";
import { oauth2Client, scopes } from "../../utils/helper";

const router: Router = Router();

router.get("/oauthcallback", (req: Request, res: Response) => {
  /*  #swagger.tags = ['Google Auth'] */
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes, // If you only need one scope you can pass it as a string
  });
  res.status(200).json({ url: url });
});

router.get("/retrievetoken/:uid", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Google Auth'] */
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code.toString());
    const result: any = await UserAccessModel.findOne({ uid: req.params.uid });
    if (result) {
      await UserAccessModel.findByIdAndUpdate(result.id, { google: tokens });
    } else {
      const credentials = new UserAccessModel({ uid: req.params.uid, google: tokens });
      await credentials.save();
    }
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
});

router.get("/checkaccess/:uid", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Google Auth'] */
  const result: any = await UserAccessModel.findOne({ uid: req.params.uid });
  if (result && result.google) {
    res.status(200).json({ google: "connected" });
  } else {
    res.status(401).send("Unauthorized: Account not connected");
  }
});

export default router;
