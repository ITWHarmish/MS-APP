import { Request, Response, Router } from "express";

import * as ReportController from "../controllers/report";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/report", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Report'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await ReportController.reportMonthlyTimelog(req.query);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
