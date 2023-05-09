import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";

@injectable()
export default class KioskUpdate {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(id: string, data: IKiosk) {
    const kiosk = await this.kioskRepository.update(id, data);
    return kiosk;
  }
}
