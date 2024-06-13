import "dotenv/config";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import http from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index";
import Socket from "./socket";

const swaggerFile = require("../swagger-output.json");

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

const server = http.createServer(app);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000000 }));
app.use(bodyParser.json());

Socket.connect(server);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() =>
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    }),
  )
  .catch((error) => {
    throw error;
  });

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes(app);
