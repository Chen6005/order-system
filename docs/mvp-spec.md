# Order System MVP Specification

## Project Goal

Build a simple web-based ordering system that lets customers place menu orders and lets admins manage incoming orders.

## MVP Scope

- Customer can browse menu.
- Customer can add items to cart.
- Customer can submit an order.
- Admin can view incoming orders.
- Admin can update order status.

## Customer Flow

1. Customer opens the menu page.
2. Customer reviews available menu items.
3. Customer adds one or more items to the cart.
4. Customer reviews the cart.
5. Customer submits the order.
6. Customer sees a basic order confirmation.

## Admin Flow

1. Admin opens the orders page.
2. Admin views incoming orders.
3. Admin checks order details and current status.
4. Admin updates the order status as work progresses.

## Core Pages

- Menu page: Displays available menu items.
- Cart page: Shows selected items and order summary.
- Order confirmation page: Confirms that the order was submitted.
- Admin orders page: Lists incoming orders and their statuses.
- Admin order detail page: Shows order details and status controls.

## Basic Data Models

### Menu Item

- `id`: Unique item identifier.
- `name`: Item name.
- `description`: Short item description.
- `price`: Item price.
- `available`: Whether the item can be ordered.

### Cart Item

- `menuItemId`: Related menu item identifier.
- `name`: Item name at the time of selection.
- `price`: Item price at the time of selection.
- `quantity`: Selected quantity.

### Order

- `id`: Unique order identifier.
- `items`: List of cart items.
- `status`: Current order status.
- `createdAt`: Order creation time.

### Order Status

- `new`
- `preparing`
- `ready`
- `completed`
- `cancelled`

## Out of Scope for MVP

- Payment
- User registration
- Coupons
- Multi-store
- Delivery tracking
- Firebase integration
