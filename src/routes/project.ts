import { Request, Response, Router } from "express";

import * as ProjectController from "../controllers/project";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/project", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Project'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await ProjectController.readProject();
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/project/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Project'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await ProjectController.createProject(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/project/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Project'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. project id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await ProjectController.updateProject(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/project/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Project'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. project id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await ProjectController.deleteProject(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
