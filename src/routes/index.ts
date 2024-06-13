import { Application, Request, Response, Router } from "express";

import company from "./company";
import gAuth from "./google/gAuth";
import gCalendar from "./google/gCalendar";
import holiday from "./holiday";
import leave from "./leave";
import project from "./project";
import reports from "./reports";
import task from "./task";
import timelog from "./timelog";
import todo from "./todo";
import training from "./training";
import blog from "./blog";
import team from "./team";

const registerRoutes = (app: Application) => {
  const router: Router = Router();
  router.use(company);
  router.use(gAuth);
  router.use(gCalendar);
  router.use(holiday);
  router.use(leave);
  router.use(project);
  router.use(reports);
  router.use(task);
  router.use(timelog);
  router.use(todo);
  router.use(training);
  router.use(blog);
  router.use(team);
  router.use("/*", (req: Request, res: Response) => {
    res.status(404).send("Not found");
  });
  app.use("/api", router);
};

export default registerRoutes;
