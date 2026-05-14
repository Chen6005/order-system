"use client";

import { FormEvent, useState } from "react";

type AdminLoginFormProps = {
  onLogin: (email: string, password: string) => Promise<void>;
  authError: string;
  isLoading: boolean;
};

export function AdminLoginForm({
  onLogin,
  authError,
  isLoading,
}: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onLogin(email, password);
  }

  return (
    <form
      className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-sm font-medium text-emerald-700">管理員登入</p>
        <h2 className="mt-2 text-xl font-semibold text-stone-950">
          登入訂單管理
        </h2>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
          Email
          <input
            className="rounded-md border border-stone-200 px-3 py-2 text-stone-950 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-600"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@example.com"
            required
            type="email"
            value={email}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-stone-700">
          密碼
          <input
            className="rounded-md border border-stone-200 px-3 py-2 text-stone-950 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-600"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="請輸入密碼"
            required
            type="password"
            value={password}
          />
        </label>
      </div>

      {authError ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {authError}
        </p>
      ) : null}

      <button
        className="mt-5 w-full rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "登入中..." : "登入"}
      </button>
    </form>
  );
}
