import prisma from "../services/prisma";
import { IKioskRepository, IKiosk } from "../dtos/IKioskRepository";

export default class KioskRepository implements IKioskRepository {
  async create(data: IKiosk) {
    return await prisma.kiosk.create({ data });
  }
  async findOne(id: string) {
    return await prisma.kiosk.findFirst({ where: { id: id } });
  }
  public async find() {
    return await prisma.kiosk.findMany();
  }

  public async update(id: string, data: IKiosk) {
    return await prisma.kiosk.update({
      where: { id: id },
      data,
    });
  }

  public async delete(id: string) {
    return await prisma.kiosk.delete({
      where: { id: id },
    });
  }
}
