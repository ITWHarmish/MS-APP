import { Request, Response, Router } from "express";

import * as TaskController from "../controllers/task";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/task-paginated", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.getPaginatedTask(req.query);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/task", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    if (req.query.tid) {
      ApiResponse.data = await TaskController.getTaskById(String(req.query.tid));
    } else {
      ApiResponse.data = await TaskController.getAllTask();
    }
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/task/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.createTask(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/task/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. task id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.updateTask(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/task/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. task id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.deleteTask(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/task/comment/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. task id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.createComment(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/task/comment/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. task id required!" });
  if (req.query.commentId === "") res.status(500).send({ error: "missing commentId query. task commentId required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.updateComment(
      req.query.id as string,
      req.query.commentId as string,
      req.body,
    );
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/task/comment/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. task id required!" });
  if (req.query.commentId === "") res.status(500).send({ error: "missing commentId query. task commentId required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.deleteComment(req.query.id as string, req.query.commentId as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/task/history/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Task'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TaskController.createHistory(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
