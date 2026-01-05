export type DessertVariant = {
  id: string;
  name: string;
};

export type Dessert = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
  variants?: DessertVariant[];
};
