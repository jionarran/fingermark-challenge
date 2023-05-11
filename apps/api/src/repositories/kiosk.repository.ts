import prisma from "../services/prisma";
import { IKioskRepository, IKiosk, IFilter } from "../dtos/IKioskRepository";

export default class KioskRepository implements IKioskRepository {
  async create(data: IKiosk) {
    return await prisma.kiosk.create({ data });
  }

  async findOne(filter: IFilter) {
    return await prisma.kiosk.findFirst({ where: filter ?? {} });
  }

  public async find(filter: IFilter) {
    return await prisma.kiosk.findMany({
      where: filter ?? {},
      orderBy: { createdAt: "desc" },
    });
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
