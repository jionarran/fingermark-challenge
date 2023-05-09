import { container } from "tsyringe";
import { IKioskRepository } from "../../dtos/IKioskRepository";
import KioskRepository from "../../repositories/kiosk.repository";

container.registerSingleton<IKioskRepository>(
  "KioskRepository",
  KioskRepository
);
