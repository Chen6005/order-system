export type MenuCategory =
  | "pasta"
  | "pizza"
  | "drink"
  | "dessert";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
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
