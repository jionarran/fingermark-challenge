import { json, urlencoded } from "body-parser";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import "reflect-metadata";
import "./shared/container";

import routes from "./routes";

// @ts-ignore
export const createServer: Express = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(routes);

  return app;
};
