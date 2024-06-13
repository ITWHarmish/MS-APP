import { Request, Response, Router } from "express";

import { gAuthMiddleware } from "../../middleware";
import { getCalender } from "../../utils/helper";

const router: Router = Router();

router.get("/calander-list/:uid", gAuthMiddleware, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Google Calendar'] */
  const calendar = await getCalender(req.params.uid);
  const list = await calendar.calendarList.list();
  return res.status(200).json(list.data);
});

router.get("/calander-events/:uid", gAuthMiddleware, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Google Calendar'] */
  const calendar = await getCalender(req.params.uid);
  const list = await calendar.events.list({
    calendarId: "itw.divyap@gmail.com",
  });
  return res.status(200).json(list.data);
});

export default router;
