import type { Order, OrderStatus } from "@/lib/types";

const orderStatusOptions: OrderStatus[] = [
  "new",
  "preparing",
  "ready",
  "completed",
  "cancelled",
];

const orderStatusLabels: Record<OrderStatus, string> = {
  new: "新訂單",
  preparing: "製作中",
  ready: "可取餐",
  completed: "已完成",
  cancelled: "已取消",
};

type AdminOrdersProps = {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
};

type WorkflowSection = {
  key: "pending" | "preparing" | "completed";
  title: string;
  orders: Order[];
};

export function AdminOrders({ orders, onStatusChange }: AdminOrdersProps) {
  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const sections: WorkflowSection[] = [
    {
      key: "pending",
      title: "新訂單（pending）",
      orders: sortedOrders.filter((order) => order.status === "new"),
    },
    {
      key: "preparing",
      title: "製作中（preparing）",
      orders: sortedOrders.filter(
        (order) => order.status === "preparing" || order.status === "ready",
      ),
    },
    {
      key: "completed",
      title: "已完成（completed）",
      orders: sortedOrders.filter(
        (order) =>
          order.status === "completed" || order.status === "cancelled",
      ),
    },
  ];

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
          訂單管理
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-stone-950">訂單</h2>
      </div>

      {orders.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">目前還沒有訂單。</p>
      ) : (
        <div className="mt-5 flex flex-col gap-6">
          {sections.map((section) => (
            <section className="flex flex-col gap-3" key={section.key}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-stone-900">
                  {section.title}
                </h3>
                <p className="text-sm font-medium text-stone-600">
                  {section.orders.length} 筆
                </p>
              </div>

              {section.orders.length === 0 ? (
                <p className="rounded-md border border-dashed border-stone-200 bg-stone-50 p-3 text-sm text-stone-500">
                  目前沒有此區訂單。
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {section.orders.map((order) => (
                    <article
                      className="grid gap-2 rounded-md border border-stone-100 bg-stone-50 p-4 text-sm sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                      key={order.id}
                    >
                      <p className="font-medium text-stone-950">
                        訂單 #{order.id}
                      </p>
                      <label className="flex items-center gap-2 text-stone-600">
                        <span>狀態</span>
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
                              {orderStatusLabels[status]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="text-stone-600">
                        品項數：{order.items.length}
                      </p>
                      <p className="text-stone-600">{order.createdAt}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
