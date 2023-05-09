export interface IKiosk {
  id?: string;
  serialKey: string;
  description: string;
  isKioskClosed: boolean;
  storeOpensAt: Date;
  storeClosedAt: Date;
}

export interface IKioskRepository {
  create(data: IKiosk): Promise<IKiosk> | void;
  update(id: string, data: IKiosk): Promise<IKiosk> | void;
  find(): Promise<IKiosk[]> | void;
  findOne(id: string): Promise<IKiosk | null>;
  delete(id: string): Promise<IKiosk | null>;
}
