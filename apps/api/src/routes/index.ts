import { Router } from "express";
import KioskRoutes from "./kiosk.routes";

const routes: Router = Router();

routes.get("/health", (req, res) => res.send());

routes.use("/kiosk", KioskRoutes);

export default routes;
