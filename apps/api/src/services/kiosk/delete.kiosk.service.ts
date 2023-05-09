import { injectable, inject } from "tsyringe";
import { IKioskRepository } from "../../dtos/IKioskRepository";

@injectable()
export default class KioskDelete {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(id: string) {
    const kiosk = await this.kioskRepository.delete(id);
    return kiosk;
  }
}
