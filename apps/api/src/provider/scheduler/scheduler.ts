import cron from "node-cron";
import templates from "./templates";
import CheckOpenCloseKiosk from "../../services/checkOpenCloseKiosk";
import { container } from "tsyringe";

class Scheduler {
  constructor() {}
  start() {
    const getSchedules = Object.values(templates);

    getSchedules.map(async (schedule) => {
      cron.schedule(schedule.target, async () => {
        console.log("running a task every minute", new Date());
        const checkOpenCloseKiosk = container.resolve(CheckOpenCloseKiosk);
        const result = await checkOpenCloseKiosk.execute();
        console.log(result);
      });
    });
  }
}

export default new Scheduler();
