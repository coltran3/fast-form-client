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
      try {
        const parsedUser = JSON.parse(userString) as string;

        return parsedUser;
      } catch (error) {
        localStorage.removeItem("user");
      }
    }

    return undefined;
  });

  async function login(loginParams: LoginParams) {
    try {
      const token = (await apiClient.post("/auth", loginParams)).data.data as string;

      setUser(token);
      localStorage.setItem("user", JSON.stringify(token));
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
