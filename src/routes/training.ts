import { Request, Response, Router } from "express";

import * as TrainingController from "../controllers/training";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/training", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Training'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TrainingController.trainingList();
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/training/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Training'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TrainingController.createTraining(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/training/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Training'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. training id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TrainingController.updateTraining(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/training/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Training'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. training id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TrainingController.deleteTraining(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
