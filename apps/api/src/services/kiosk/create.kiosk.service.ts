import { injectable, inject, container } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";
import HandleError from "../../errors/HandleError";
import getBaseTime from "../../utils/getBaseTime";
import CheckOpenCloseKiosk from "../../services/checkOpenCloseKiosk";

@injectable()
export default class KioskCreate {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(data: IKiosk) {
    console.log("data.serialKey", data.serialKey);
    const alreadyExist = await this.kioskRepository.findOne({
      serialKey: data.serialKey,
    });

    console.log("alreadyExist", alreadyExist);

    if (alreadyExist)
      throw new HandleError("Already exists a kiosk with this serial key");

    try {
      data.storeClosedAt = new Date(
        getBaseTime() + (data.storeClosedAt + "").substring(11, 24)
      );
      data.storeOpensAt = new Date(
        getBaseTime() + (data.storeOpensAt + "").substring(11, 24)
      );

      console.log("---", data);
      const kiosk = await this.kioskRepository.create(data);

      const checkOpenCloseKiosk = container.resolve(CheckOpenCloseKiosk);
      checkOpenCloseKiosk.execute();

      return kiosk;
    } catch (error: any) {
      throw new HandleError(
        error.message ?? "An error occurred while creating"
      );
    }
  }
}
