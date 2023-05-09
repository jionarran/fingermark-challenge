import { Request, Response } from "express";
import { container } from "tsyringe";
import KioskCreate from "../services/kiosk/create.kiosk.service";
import KioskDelete from "../services/kiosk/delete.kiosk.service";
import KioskUpdate from "../services/kiosk/update.kiosk.service";
import KioskGet from "../services/kiosk/get.kiosk.services";
import KioskList from "../services/kiosk/list.kiosk.service";

export default class KioskController {
  constructor() {}

  public async create(req: Request, res: Response) {
    const data = req.body;
    console.log(JSON.stringify(data));

    const kioksService = container.resolve(KioskCreate);
    const kiosk = await kioksService.execute(data);
    return res.json(kiosk);
  }

  public async update(req: Request, res: Response) {
    const data = req.body;
    const id = String(req.params.id);

    const kioksService = container.resolve(KioskUpdate);
    const kiosk = await kioksService.execute(id, data);
    return res.json(kiosk);
  }

  public async find(req: Request, res: Response) {
    const id = req.params.id;
    const kioksService = container.resolve(KioskGet);
    const kiosk = await kioksService.execute(id);
    return res.json(kiosk);
  }

  public async findOne(req: Request, res: Response) {
    const data = req.body;
    const kioksService = container.resolve(KioskList);
    const kiosks = await kioksService.execute();
    return res.json(kiosks);
  }

  public async delete(req: Request, res: Response) {
    const data = req.body;
    return res.json(data);
  }
}
