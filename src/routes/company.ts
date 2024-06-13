import bodyParser from "body-parser";
import { Request, Response, Router } from "express";

import * as CompanyController from "../controllers/company";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();
const jsonParser = bodyParser.json();

router.get("/company", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Company'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await CompanyController.readCompany();
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/company/add", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Company'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await CompanyController.createCompany(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/company/update", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Company'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. company id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await CompanyController.updateCompany(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/company/delete", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Company'] */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. company id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await CompanyController.deleteCompany(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
