import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import {
  signInAdmin,
  signOutAdmin,
  subscribeToAuthState,
} from "@/lib/auth-service";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    setAuthError("");

    try {
      await signInAdmin(email, password);
    } catch {
      setAuthError("登入失敗，請確認帳號或密碼。");
    }
  }

  async function logout() {
    setAuthError("");
    await signOutAdmin();
  }

  return {
    authError,
    isLoading,
    login,
    logout,
    user,
  };
}
