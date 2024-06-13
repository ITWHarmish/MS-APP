import { Request, Response, Router } from "express";

import * as holidayController from "../controllers/holiday";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/holiday", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Holiday'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await holidayController.readHoliday();
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/holiday/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Holiday'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await holidayController.createHoliday(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/holiday/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Holiday'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. holiday id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await holidayController.updateHoliday(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/holiday/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Holiday'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. holiday id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await holidayController.deleteHoliday(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
