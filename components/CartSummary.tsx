import type { CartItem } from "@/lib/types";

type CartSummaryProps = {
  cartItems: CartItem[];
  total: number;
  onIncrease: (menuItemId: string) => void;
  onDecrease: (menuItemId: string) => void;
  onCheckout: () => void;
  checkoutSuccess: boolean;
  orderError: string;
};

export function CartSummary({
  cartItems,
  total,
  onIncrease,
  onDecrease,
  onCheckout,
  checkoutSuccess,
  orderError,
}: CartSummaryProps) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-lg border border-[#d9c7a8] bg-[#fffaf0] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#234336]">購物車摘要</h2>
        <p className="text-sm font-medium text-[#7a5a2f]">
          共 {cartCount} 件
        </p>
      </div>

      {checkoutSuccess ? (
        <p className="mt-4 rounded-md border border-[#b9d2bd] bg-[#edf5eb] px-4 py-3 text-sm font-medium text-[#234336]">
          訂單送出成功
        </p>
      ) : null}

      {orderError ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {orderError}
        </p>
      ) : null}

      {cartItems.length === 0 ? (
        <p className="mt-4 text-sm text-[#6c5b49]">購物車目前是空的</p>
      ) : (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                className="grid gap-2 border-b border-[#eadfca] pb-3 text-sm last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                key={item.menuItemId}
              >
                <p className="font-medium text-[#2f251d]">{item.name}</p>
                <div className="flex items-center gap-2 text-[#6c5b49]">
                  <button
                    aria-label={`減少 ${item.name} 數量`}
                    className="flex size-7 items-center justify-center rounded-md border border-[#d9c7a8] bg-[#f8f3ea] text-sm font-semibold text-[#6c5b49] transition-colors hover:bg-[#efe4d0]"
                    onClick={() => onDecrease(item.menuItemId)}
                    type="button"
                  >
                    -
                  </button>
                  <span>數量 {item.quantity}</span>
                  <button
                    aria-label={`增加 ${item.name} 數量`}
                    className="flex size-7 items-center justify-center rounded-md border border-[#d9c7a8] bg-[#f8f3ea] text-sm font-semibold text-[#6c5b49] transition-colors hover:bg-[#efe4d0]"
                    onClick={() => onIncrease(item.menuItemId)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <p className="text-[#6c5b49]">NT${item.price}</p>
                <p className="font-semibold text-[#2f251d]">
                  NT${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-[#d9c7a8] pt-4">
            <p className="text-sm font-medium text-[#6c5b49]">總金額</p>
            <p className="text-lg font-semibold text-[#234336]">NT${total}</p>
          </div>
        </div>
      )}

      <button
        className="mt-5 w-full rounded-full bg-[#234336] px-4 py-3 text-sm font-semibold text-[#fffaf0] transition-colors hover:bg-[#1b342a] disabled:cursor-not-allowed disabled:bg-[#ddd2bf] disabled:text-[#8a7b68]"
        disabled={cartItems.length === 0}
        onClick={onCheckout}
        type="button"
      >
        送出訂單
      </button>
    </section>
  );
}
