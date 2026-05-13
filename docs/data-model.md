# Data Model Documentation

## MenuItem Model

```ts
type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
};
```

`MenuItem` represents an item that customers can browse and add to their cart.

## CartItem Model

```ts
type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};
```

`CartItem` represents a selected menu item in the customer's cart.

## Order Model

```ts
type Order = {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  createdAt: string;
};
```

`Order` represents a submitted customer order and its current processing state.

## OrderStatus Type

```ts
type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";
```

`OrderStatus` tracks the lifecycle of an order from submission to completion or cancellation.

## Why Order Items Store Name and Price Snapshots

Order items store `name` and `price` snapshots so existing orders remain accurate even if menu items are renamed, repriced, or removed later.

## Notes for Future Firebase Integration

- Store menu items in a `menuItems` collection.
- Store submitted orders in an `orders` collection.
- Use server timestamps for order creation time.
- Keep order item snapshots inside each order document.
- Add security rules before exposing admin order management.
