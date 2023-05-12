import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../dtos/IKioskRepository";
import getCurrentTime from "../utils/getCurrentTime";
import { io } from "../server";

@injectable()
export default class CheckOpenCloseKiosk {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute() {
    const currentTime: string = getCurrentTime();

    let updatedOpen;
    let updatedClosed;

    try {
      const toOpenKiosks = await this.kioskRepository.find({
        storeOpensAt: {
          lte: currentTime,
        },
        storeClosedAt: {
          gte: currentTime,
        },
        isKioskClosed: true,
      });

      const toCloseKiosks = await this.kioskRepository.find({
        storeClosedAt: {
          lte: currentTime,
        },
        isKioskClosed: false,
      });

      console.log({ toOpenKiosks, toCloseKiosks });

      if (toOpenKiosks?.length > 0)
        toOpenKiosks?.map(async (kiosk) => {
          if (kiosk?.id) {
            updatedOpen = await this.kioskRepository.update(kiosk?.id, {
              ...kiosk,
              isKioskClosed: false,
              id: undefined,
            });
            console.log("updatedOpen", updatedOpen);
          }
        });

      if (toCloseKiosks?.length > 0)
        toCloseKiosks?.map(async (kiosk) => {
          if (kiosk?.id) {
            updatedClosed = await this.kioskRepository.update(kiosk?.id, {
              ...kiosk,
              isKioskClosed: true,
              id: undefined,
            });
            console.log("updatedClosed", updatedClosed);
          }
        });

      console.log({ updatedOpen, updatedClosed });
      const changesOccurred =
        toOpenKiosks?.length > 0 || toCloseKiosks?.length > 0;

      if (changesOccurred) {
        io.emit("refresh", {
          open: toOpenKiosks.map((item) => item.id),
          closed: toCloseKiosks.map((item) => item.id),
        });
      }

      return changesOccurred;
    } catch (e) {
      console.error(e);
    }
  }
}
