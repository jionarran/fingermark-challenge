import { Router } from "express";
import KioskController from "../controllers/kiosk.controller";

const kioskController = new KioskController();

const kioskRoutes: Router = Router();

kioskRoutes.get("/:id", (req, res) => kioskController.findOne(req, res));

kioskRoutes.get("/", (req, res) => kioskController.find(req, res)); // ok

kioskRoutes.post("/", (req, res) => kioskController.create(req, res)); // ok

kioskRoutes.put("/:id", (req, res) => kioskController.update(req, res));

kioskRoutes.delete("/:id", (req, res) => kioskController.delete(req, res));

export default kioskRoutes;
