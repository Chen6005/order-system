"use client";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminOrders } from "@/components/AdminOrders";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useOrderSystem } from "@/hooks/useOrderSystem";

export default function AdminPage() {
  const { authError, isLoading, login, logout, user } = useAdminAuth();
  const { orders, updateOrderStatus } = useOrderSystem(Boolean(user));

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            管理後台
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
            訂單管理
          </h1>
        </header>

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
