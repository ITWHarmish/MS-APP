import { Request, Response, Router } from "express";

import * as LeaveController from "../controllers/leave";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/leave", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Leave'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  const uid: string = req.query.uid as string;
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await LeaveController.readLeave(uid);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/leave/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Leave'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await LeaveController.createLeave(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/leave/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Leave'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. leave id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await LeaveController.updateLeave(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/leave/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Leave'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. leave id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await LeaveController.deleteLeave(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
