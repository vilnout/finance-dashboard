import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const token = localStorage.getItem("auth_token");

export const useAuthStore = create<AuthStore>((set) => ({
  user: token ? { name: "Demo User", email: "user@example.com" } : null,
  isAuthenticated: !!token,

  login: async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("auth_token", "mock_jwt_token_12345");

    set({
      user: { name: "Demo User", email },
      isAuthenticated: true,
    });
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, isAuthenticated: false });
  },
}));
