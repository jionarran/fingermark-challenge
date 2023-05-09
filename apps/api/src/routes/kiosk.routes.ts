import { Router } from "express";
import KioskController from "../controllers/kiosk.controller";

const kioskController = new KioskController();

const kioskRoutes: Router = Router();

kioskRoutes.get("/", (req, res) => kioskController.findOne(req, res));

kioskRoutes.post("/", (req, res) => kioskController.create(req, res));

kioskRoutes.put("/:id", (req, res) => kioskController.update(req, res));

kioskRoutes.delete("/:id", (req, res) => kioskController.delete(req, res));

export default kioskRoutes;
