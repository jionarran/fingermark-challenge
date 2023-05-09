import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";

@injectable()
export default class KioskCreate {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(data: IKiosk) {
    const kiosk = await this.kioskRepository.create(data);
    return kiosk;
  }
}
