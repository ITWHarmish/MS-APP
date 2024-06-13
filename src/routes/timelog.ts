import bodyParser from "body-parser";
import { Request, Response, Router } from "express";

import * as TimelogController from "../controllers/timelog";
import { IResponse } from "../types/IResponse";
import { parseError } from "../utils/helper";

const router: Router = Router();
const jsonParser = bodyParser.json();

router.get("/timelog/upload", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to upload timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.uploadTimelogToDrive(req.query.uid as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/timelog/all", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to get all user timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.startDate === "")
    res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
  if (req.query.endDate === "") res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.getAllTimelogs(req.query);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/timelog", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
      #swagger.description = 'Endpoint to get the specific user timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.uid === "") res.status(500).send({ error: "missing uid query. timelog uid required!" });
  if (req.query.date === "") res.status(500).send({ error: "missing date query. timelog date required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.readTimelog(req.query);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.post("/timelog/add", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to add specific user timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.createTimelog(req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.put("/timelog/update", jsonParser, async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to update specific user timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. timelog id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.updateTimelog(req.query.id as string, req.body);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.delete("/timelog/delete", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to delete specific user timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.id === "") res.status(500).send({ error: "missing id query. timelog id required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.deleteTimelog(req.query.id as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/timelog/totalhours", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to get the specific user timelog total hours.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.uid === "") res.status(500).send({ error: "missing uid query. timelog uid required!" });
  if (req.query.startDate === "")
    res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
  if (req.query.endDate === "") res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.getTotalHours(
      req.query.uid as string,
      req.query.startDate as string,
      req.query.endDate as string,
    );
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/timelog/timeloghours", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to get the specific user timelog hours.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.uid === "") res.status(500).send({ error: "missing uid query. timelog uid required!" });
  if (req.query.date === "") res.status(500).send({ error: "missing date query. timelog date required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.getTimelogHours(req.query.uid as string, req.query.date as string);
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

router.get("/timelog/projecthours", async (req: Request, res: Response) => {
  /*  #swagger.tags = ['Timelog']
    #swagger.description = 'Endpoint to get the specific user project timelog.' */
  let ApiResponse: IResponse = { code: 200, data: "" };
  if (req.query.uid === "") res.status(500).send({ error: "missing uid query. timelog uid required!" });
  if (req.query.startDate === "")
    res.status(500).send({ error: "missing startDate query. timelog startDate required!" });
  if (req.query.endDate === "") res.status(500).send({ error: "missing endDate query. timelog endDate required!" });
  try {
    ApiResponse.code = 200;
    ApiResponse.data = await TimelogController.projectHours(
      req.query.uid as string,
      req.query.startDate as string,
      req.query.endDate as string,
    );
  } catch (error) {
    ApiResponse = parseError(error);
  } finally {
    res.status(ApiResponse.code).send(ApiResponse.data);
  }
});

export default router;
