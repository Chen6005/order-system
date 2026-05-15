"use client";

import { useState } from "react";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { isAdminEmail } from "@/lib/admin";
import { seedMenuItems } from "@/lib/menu-service";

export default function SeedMenuPage() {
  const { authError, isLoading, login, user } = useAdminAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState("");
  const [seedError, setSeedError] = useState("");
  const isAuthorizedAdmin = isAdminEmail(user?.email);

  async function handleSeedMenuItems() {
    setIsSeeding(true);
    setSeedSuccess("");
    setSeedError("");

    try {
      await seedMenuItems();
      setSeedSuccess("菜單資料已寫入 Firestore。");
    } catch {
      setSeedError("菜單資料寫入失敗，請稍後再試。");
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10 text-stone-950 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            管理後台
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">
            初始化菜單資料
          </h1>
        </header>

        {isLoading ? (
          <section className="rounded-lg border border-stone-200 bg-white p-5 text-sm font-medium text-stone-700 shadow-sm">
            驗證管理員登入狀態中...
          </section>
        ) : user && isAuthorizedAdmin ? (
          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-6 text-stone-600">
              將目前 mock menu 寫入 Firestore menuItems collection
            </p>

            {seedSuccess ? (
              <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                {seedSuccess}
              </p>
            ) : null}

            {seedError ? (
              <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {seedError}
              </p>
            ) : null}

            <button
              className="mt-5 rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
              disabled={isSeeding}
              onClick={() => void handleSeedMenuItems()}
              type="button"
            >
              {isSeeding ? "寫入中..." : "寫入菜單資料"}
            </button>
          </section>
        ) : user ? (
          <section className="rounded-lg border border-red-100 bg-white p-5 text-sm font-medium text-red-700 shadow-sm">
            此帳號沒有管理員權限。
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
