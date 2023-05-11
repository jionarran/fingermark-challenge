export interface IKiosk {
  id?: string;
  serialKey: string;
  description: string;
  isKioskClosed: boolean;
  storeOpensAt: Date;
  storeClosedAt: Date;
}

export interface IStoreOpensAt {
  gte?: string;
  lte?: string;
}

export interface IStoreClosedAt {
  lte?: string;
  gte?: string;
}

export interface IFilter {
  serialKey?: string;
  id?: string;
  storeOpensAt?: IStoreOpensAt | string;
  storeClosedAt?: IStoreClosedAt | string;
  isKioskClosed?: boolean;
}

export interface IKioskRepository {
  create(data: IKiosk): Promise<IKiosk>;
  update(id: string, data: IKiosk): Promise<IKiosk> | void;
  find(filter: IFilter): Promise<IKiosk[]>;
  findOne(filter: IFilter): Promise<IKiosk | null>;
  delete(id: string): Promise<IKiosk | null>;
}
