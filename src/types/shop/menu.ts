type IUuid = {
  _id?: string;
};

export type IAdditional = IUuid & {
  name: string;
  price: number;
  categories: Partial<ICategory[]>;
};

export type IMenuItem = IUuid & {
  name: string;
  price: number;
  ingredients?: string;
};

export type IMenu = IUuid & {
  category: string;
  item: IMenuItem;
};

export type ICategory = IUuid & {
  name: string;
};
