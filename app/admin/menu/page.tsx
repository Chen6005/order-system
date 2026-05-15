"use client";

import Image from "next/image";
import { useState } from "react";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useMenuItems } from "@/hooks/useMenuItems";
import { isAdminEmail } from "@/lib/admin";
import {
  createMenuItem,
  updateMenuItemAvailability,
} from "@/lib/menu-service";
import type { MenuCategory, MenuItem, Season } from "@/lib/types";

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

const categoryOptions: MenuCategory[] = [
  "seasonalSoup",
  "herbalSoup",
  "dessertSoup",
  "teaDrink",
];

const seasonOptions: Season[] = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "allYear",
];

type MenuFormState = {
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  season: Season;
  imageUrl: string;
};

const initialMenuFormState: MenuFormState = {
  name: "",
  description: "",
  price: "",
  category: "seasonalSoup",
  season: "allYear",
  imageUrl: "",
};

export default function AdminMenuPage() {
  const { authError, isLoading, login, user } = useAdminAuth();
  const { isLoading: isMenuLoading, menuError, menuItems } = useMenuItems();
  const isAuthorizedAdmin = isAdminEmail(user?.email);
  const [availabilityError, setAvailabilityError] = useState("");
  const [menuForm, setMenuForm] = useState<MenuFormState>(initialMenuFormState);
  const [createSuccessMessage, setCreateSuccessMessage] = useState("");
  const [createErrorMessage, setCreateErrorMessage] = useState("");

  const handleToggleAvailability = async (
    menuItemId: string,
    available: boolean,
  ) => {
    setAvailabilityError("");

    try {
      await updateMenuItemAvailability(menuItemId, !available);
    } catch (error) {
      console.error(error);
      setAvailabilityError("商品狀態更新失敗，請稍後再試。");
    }
  };

  const handleCreateMenuItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateSuccessMessage("");
    setCreateErrorMessage("");

    const newMenuItem: MenuItem = {
      id: crypto.randomUUID(),
      name: menuForm.name,
      description: menuForm.description,
      price: Number(menuForm.price),
      category: menuForm.category,
      season: menuForm.season,
      imageUrl: menuForm.imageUrl,
      available: true,
    };

    try {
      await createMenuItem(newMenuItem);
      setMenuForm(initialMenuFormState);
      setCreateSuccessMessage("商品新增成功");
    } catch (error) {
      console.error(error);
      setCreateErrorMessage("商品新增失敗，請稍後再試");
    }
  };

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
            <section className="rounded-lg border border-[#d9c7a8] bg-[#fffaf0] p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#234336]">新增商品</h2>
              <form className="mt-4 grid gap-3" onSubmit={handleCreateMenuItem}>
                <input
                  className="rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  placeholder="商品名稱"
                  required
                  type="text"
                  value={menuForm.name}
                />
                <textarea
                  className="min-h-24 rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                  placeholder="商品描述"
                  required
                  value={menuForm.description}
                />
                <input
                  className="rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  min={0}
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      price: event.target.value,
                    }))
                  }
                  placeholder="價格"
                  required
                  step="1"
                  type="number"
                  value={menuForm.price}
                />
                <select
                  className="rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      category: event.target.value as MenuCategory,
                    }))
                  }
                  value={menuForm.category}
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      season: event.target.value as Season,
                    }))
                  }
                  value={menuForm.season}
                >
                  {seasonOptions.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
                <input
                  className="rounded-md border border-[#d6bc82] bg-white px-3 py-2 text-sm text-[#2f251d] outline-none ring-[#234336] focus:ring-2"
                  onChange={(event) =>
                    setMenuForm((previous) => ({
                      ...previous,
                      imageUrl: event.target.value,
                    }))
                  }
                  placeholder="imageUrl"
                  required
                  type="text"
                  value={menuForm.imageUrl}
                />
                <div className="flex items-center gap-3">
                  <button
                    className="rounded-md border border-[#b69258] bg-[#f5e8cf] px-4 py-2 text-sm font-medium text-[#704f1f] transition hover:bg-[#eddab8]"
                    type="submit"
                  >
                    新增商品
                  </button>
                  {createSuccessMessage ? (
                    <p className="text-sm font-medium text-[#25553f]">
                      {createSuccessMessage}
                    </p>
                  ) : null}
                  {createErrorMessage ? (
                    <p className="text-sm font-medium text-red-700">
                      {createErrorMessage}
                    </p>
                  ) : null}
                </div>
              </form>
            </section>

            {availabilityError ? (
              <section className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700 shadow-sm">
                {availabilityError}
              </section>
            ) : null}
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

                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.available
                              ? "bg-[#eaf6ec] text-[#25553f]"
                              : "bg-[#f6ece3] text-[#7a5a2f]"
                          }`}
                        >
                          {item.available ? "供應中" : "已下架"}
                        </span>
                        <button
                          className="rounded-md border border-[#b69258] bg-[#f5e8cf] px-3 py-2 text-sm font-medium text-[#704f1f] transition hover:bg-[#eddab8]"
                          onClick={() =>
                            handleToggleAvailability(item.id, item.available)
                          }
                          type="button"
                        >
                          {item.available ? "下架" : "恢復供應"}
                        </button>
                      </div>
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
