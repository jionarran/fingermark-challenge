import { injectable, inject } from "tsyringe";
import { IFilter, IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";
import HandleError from "../../errors/HandleError";

@injectable()
export default class KioskFind {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(filter: IFilter): Promise<IKiosk[] | void> {
    try {
      const kiosk = await this.kioskRepository.find(filter);
      return kiosk;
    } catch (err) {
      throw new HandleError("An error occurred while finding");
    }
  }
}
