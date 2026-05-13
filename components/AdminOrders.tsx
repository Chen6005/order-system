import type { Order, OrderStatus } from "@/lib/types";

const orderStatusOptions: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

type AdminOrdersProps = {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
};

export function AdminOrders({ orders, onStatusChange }: AdminOrdersProps) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
          Admin
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-stone-950">Orders</h2>
      </div>

      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">No orders yet.</p>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {orders.map((order) => (
            <article
              className="grid gap-2 rounded-md border border-stone-100 bg-stone-50 p-4 text-sm sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
              key={order.id}
            >
              <p className="font-medium text-stone-950">Order #{order.id}</p>
              <label className="flex items-center gap-2 text-stone-600">
                <span>Status</span>
                <select
                  className="rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-950"
                  onChange={(event) =>
                    onStatusChange(
                      order.id,
                      event.target.value as OrderStatus,
                    )
                  }
                  value={order.status}
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-stone-600">Items: {order.items.length}</p>
              <p className="text-stone-600">{order.createdAt}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
