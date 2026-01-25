// frontend/src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { login as apiLogin, me as apiMe } from "./api";
import type { User } from "./api";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (body: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // load current user on refresh (if token exists)
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
        const u = await apiMe();
        setUser(u);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function login(body: { email: string; password: string }) {
    // expects backend to return { token, user }
    const res = await apiLogin(body);

    // support both shapes: res.token / res.user OR direct token string
    const token = (res as any)?.token ?? res;
    const u = (res as any)?.user ?? null;

    if (!token) throw new Error("No token returned from server");

    localStorage.setItem("token", token);

    // if backend returns user, use it. otherwise call /auth/me
    if (u) setUser(u);
    else setUser(await apiMe());
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
