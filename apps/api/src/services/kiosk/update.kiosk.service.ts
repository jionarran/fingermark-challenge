import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";
import HandleError from "../../errors/HandleError";

@injectable()
export default class KioskUpdate {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(id: string, data: IKiosk) {
    try {
      console.log("before already executing");
      const alreadyExist = await this.kioskRepository.findOne({
        id: id,
      });

      console.log(alreadyExist);

      if (!alreadyExist)
        throw new HandleError("Already exists a kiosk with this serial key");

      const kiosk = await this.kioskRepository.update(id, data);
      return kiosk;
    } catch (err: any) {
      console.log(err);
      throw new HandleError(err.message ?? "An error occurred while updating");
    }
  }
}
