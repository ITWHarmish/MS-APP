import { Request, Response, Router } from "express";

import * as UserTodoController from "../controllers/todo";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();

router.get("/todo", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Todo'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  const uid: string = req.query.uid as string;
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await UserTodoController.getToDoList(uid);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/todo/add", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Todo'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await UserTodoController.createToDo(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/todo/update", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Todo'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. todo id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await UserTodoController.updateToDo(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/todo/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Todo'] */
  let ApiResponse: IResponse = { code: 200, data: null };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. todo id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await UserTodoController.deleteToDo(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
