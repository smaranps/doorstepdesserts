export type Dessert = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageId: string;
};

export type CartItem = {
  product: Dessert;
  quantity: number;
};
