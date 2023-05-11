import { Router } from "express";
import KioskRoutes from "./kiosk.routes";

const routes: Router = Router();

routes.get("/health", (_, res) => res.send());

routes.use("/kiosk", KioskRoutes);

export default routes;
