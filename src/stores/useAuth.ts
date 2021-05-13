import { useState, Dispatch, SetStateAction } from "react";
import { apiClient } from "../api";

export interface AuthState {
  user?: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  login(loginParams: LoginParams): Promise<void>;
  logout(): void;
}

export interface LoginParams {
  login: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<string | undefined>(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      return userString;
    }
    localStorage.removeItem("user");

    return undefined;
  });

  async function login(loginParams: LoginParams) {
    try {
      const token = (await (await apiClient.post("/auth", loginParams)).data) as string;

      setUser(token);
      localStorage.setItem("user", token);
    } catch (error) {
      throw error.response.data;
    }
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem("user");
  }

  return { user, setUser, login, logout };
}
