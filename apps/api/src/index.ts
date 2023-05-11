import { serverWS } from "./server";
import { log } from "logger";
import Scheduler from "./provider/scheduler/scheduler";
import "./provider/websockets/websockets";
import { io } from "./server";

const port = process.env.PORT || 3333;
// @ts-ignore

serverWS.listen(port, async () => {
  Scheduler.start();

  log(`api running on ${port}`);
});
