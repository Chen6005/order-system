"use client";

import { AdminOrders } from "@/components/AdminOrders";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { CartSummary } from "@/components/CartSummary";
import { MenuItemCard } from "@/components/MenuItemCard";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useOrderSystem } from "@/hooks/useOrderSystem";
import { menuItems } from "@/lib/mock-data";

const availableMenuItems = menuItems.filter((item) => item.available);

export default function Home() {
  const {
    addToCart,
    cartCount,
    cartItems,
    cartTotal,
    checkout,
    checkoutSuccess,
    decreaseQuantity,
    increaseQuantity,
    orderError,
    orders,
    updateOrderStatus,
  } = useOrderSystem();
  const { authError, isLoading, login, logout, user } = useAdminAuth();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              點餐系統
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
              今日菜單
            </h1>
            <p className="mt-4 text-base leading-7 text-stone-600">
              瀏覽目前供應的餐點，選擇你想要的品項。
            </p>
          </div>
          <div className="rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm">
            購物車 ({cartCount})
          </div>
        </header>

        <CartSummary
          cartItems={cartItems}
          checkoutSuccess={checkoutSuccess}
          onCheckout={checkout}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
          orderError={orderError}
          total={cartTotal}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableMenuItems.map((item) => (
            <MenuItemCard
              item={item}
              key={item.id}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {user ? (
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  管理員已登入
                </p>
                <p className="mt-1 text-sm text-stone-600">{user.email}</p>
              </div>
              <button
                className="rounded-md border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                onClick={() => void logout()}
                type="button"
              >
                登出
              </button>
            </div>
            <AdminOrders orders={orders} onStatusChange={updateOrderStatus} />
          </section>
        ) : (
          <AdminLoginForm
            authError={authError}
            isLoading={isLoading}
            onLogin={login}
          />
        )}
      </section>
    </main>
  );
}
