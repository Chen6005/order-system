"use client";

import Image from "next/image";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useMenuItems } from "@/hooks/useMenuItems";
import { isAdminEmail } from "@/lib/admin";
import type { MenuCategory, Season } from "@/lib/types";

const categoryLabels: Record<MenuCategory, string> = {
  seasonalSoup: "四季湯水",
  herbalSoup: "養生燉湯",
  dessertSoup: "養生糖水",
  teaDrink: "養生茶飲",
};

const seasonLabels: Record<Season, string> = {
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季",
  allYear: "四季皆宜",
};

export default function AdminMenuPage() {
  const { authError, isLoading, login, user } = useAdminAuth();
  const {
    isLoading: isMenuLoading,
    menuError,
    menuItems,
  } = useMenuItems();
  const isAuthorizedAdmin = isAdminEmail(user?.email);

  return (
    <main className="min-h-screen bg-[#f8f3ea] px-6 py-10 text-[#2f251d] sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <p className="text-sm font-medium text-[#7a5a2f]">管理後台</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#234336] sm:text-5xl">
            菜單管理
          </h1>
        </header>

        {isLoading ? (
          <section className="rounded-lg border border-[#d9c7a8] bg-[#fffaf0] p-5 text-sm font-medium text-[#6c5b49] shadow-sm">
            驗證管理員登入狀態中...
          </section>
        ) : user && isAuthorizedAdmin ? (
          <section className="flex flex-col gap-5">
            {isMenuLoading ? (
              <section className="rounded-lg border border-[#d9c7a8] bg-[#fffaf0] p-5 text-sm font-medium text-[#6c5b49] shadow-sm">
                菜單載入中...
              </section>
            ) : menuError ? (
              <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700 shadow-sm">
                菜單讀取失敗
              </section>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {menuItems.map((item) => (
                  <article
                    className="overflow-hidden rounded-lg border border-[#ddc9a5] bg-[#fffaf2] shadow-sm"
                    key={item.id}
                  >
                    <div className="relative aspect-[4/3] border-b border-[#ead8b8] bg-[#efe4d0]">
                      <Image
                        alt={item.name}
                        className="object-cover"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        src={item.imageUrl}
                      />
                    </div>
                    <div className="flex flex-col gap-4 p-5">
                      <div>
                        <p className="text-xs font-medium text-[#7a5a2f]">
                          {item.id}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-[#234336]">
                          {item.name}
                        </h2>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-[#d6bc82] bg-[#f8f3ea] px-3 py-1 text-xs font-medium text-[#7a5a2f]">
                          {categoryLabels[item.category]}
                        </span>
                        <span className="rounded-full border border-[#b9d2bd] bg-[#edf5eb] px-3 py-1 text-xs font-medium text-[#234336]">
                          {seasonLabels[item.season]}
                        </span>
                      </div>

                      <p className="text-lg font-semibold text-[#234336]">
                        NT${item.price}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
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
