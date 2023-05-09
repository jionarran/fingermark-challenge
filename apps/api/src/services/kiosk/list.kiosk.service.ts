import { injectable, inject } from "tsyringe";
import { IKiosk, IKioskRepository } from "../../dtos/IKioskRepository";

@injectable()
export default class KioskList {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(): Promise<IKiosk[] | void> {
    const kiosk = await this.kioskRepository.find();
    return kiosk;
  }
}
