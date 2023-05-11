import { injectable, inject } from "tsyringe";
import { IKioskRepository } from "../../dtos/IKioskRepository";
import HandleError from "../../errors/HandleError";

@injectable()
export default class KioskDelete {
  constructor(
    // @ts-ignore
    @inject("KioskRepository")
    private kioskRepository: IKioskRepository
  ) {}

  public async execute(id: string) {
    try {
      const kiosk = await this.kioskRepository.delete(id);
      return kiosk;
    } catch (err) {
      throw new HandleError("An error occurred while deleting");
    }
  }
}
