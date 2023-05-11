import { injectable, inject } from "tsyringe";
import { IFilter, IKioskRepository } from "../../dtos/IKioskRepository";
import HandleError from "../../errors/HandleError";

@injectable()
export default class KioskGet {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(filter: IFilter | undefined) {
    const kiosk = await this.kioskRepository.findOne(filter ?? {});

    if (!kiosk) throw new HandleError("Kiosk not found", 404);

    return kiosk;
  }
}
