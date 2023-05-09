import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";

@injectable()
export default class KioskGet {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(id: string) {
    const kiosk = await this.kioskRepository.findOne(id);
    return kiosk;
  }
}
