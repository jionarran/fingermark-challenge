import { urlencoded } from "body-parser";
import express, { Express, Request, Response, NextFunction } from "express";
import "express-async-errors";
import HandleError from "./errors/HandleError";
import cors from "cors";
import "reflect-metadata";
import "./shared/container";

import routes from "./routes";

// @ts-ignore
const app = express();
app
  .disable("x-powered-by")
  .use(urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(routes)
  .use((err: Error, _: Request, res: Response, next: NextFunction) => {
    console.log("Error: ", err);
    if (err instanceof HandleError) {
      return res.status(err.status_code).json({
        status: "error",
        message: err.message,
      });
    }

    // here the better idea is send the error to report
    return res.status(500).json({
      status: "err",
      message: "Internal Server Error",
    });
  });

import { Server } from "socket.io";
import http from "http";

const port = process.env.PORT || 3333;
// @ts-ignore

const serverWS = http.createServer(app);

const io = new Server(serverWS, { cors: { origin: "http://localhost:3001" } });

export { serverWS, io };
