import type { CartItem } from "@/lib/types";

type CartSummaryProps = {
  cartItems: CartItem[];
  total: number;
  onIncrease: (menuItemId: string) => void;
  onDecrease: (menuItemId: string) => void;
  onCheckout: () => void;
  checkoutSuccess: boolean;
};

export function CartSummary({
  cartItems,
  total,
  onIncrease,
  onDecrease,
  onCheckout,
  checkoutSuccess,
}: CartSummaryProps) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-stone-950">購物車摘要</h2>
        <p className="text-sm font-medium text-stone-500">
          共 {cartCount} 件
        </p>
      </div>

      {checkoutSuccess ? (
        <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          訂單送出成功
        </p>
      ) : null}

      {cartItems.length === 0 ? (
        <p className="mt-4 text-sm text-stone-600">購物車目前是空的</p>
      ) : (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                className="grid gap-2 border-b border-stone-100 pb-3 text-sm last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                key={item.menuItemId}
              >
                <p className="font-medium text-stone-950">{item.name}</p>
                <div className="flex items-center gap-2 text-stone-600">
                  <button
                    aria-label={`減少 ${item.name} 數量`}
                    className="flex size-7 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100"
                    onClick={() => onDecrease(item.menuItemId)}
                    type="button"
                  >
                    -
                  </button>
                  <span>數量 {item.quantity}</span>
                  <button
                    aria-label={`增加 ${item.name} 數量`}
                    className="flex size-7 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100"
                    onClick={() => onIncrease(item.menuItemId)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <p className="text-stone-600">NT${item.price}</p>
                <p className="font-semibold text-stone-950">
                  NT${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-stone-200 pt-4">
            <p className="text-sm font-medium text-stone-600">總金額</p>
            <p className="text-lg font-semibold text-emerald-700">NT${total}</p>
          </div>
        </div>
      )}

      <button
        className="mt-5 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
        disabled={cartItems.length === 0}
        onClick={onCheckout}
        type="button"
      >
        送出訂單
      </button>
    </section>
  );
}
