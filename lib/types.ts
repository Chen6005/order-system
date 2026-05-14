export type MenuCategory =
  | "seasonalSoup"
  | "herbalSoup"
  | "dessertSoup"
  | "teaDrink";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  imageUrl: string;
  available: boolean;
};

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: string;
};
