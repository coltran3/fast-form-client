import { useState, Dispatch, SetStateAction } from "react";
import { apiClient } from "../api";

export interface AuthState {
  user?: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  login: (loginParams: LoginParams) => Promise<void>;
}

export interface LoginParams {
  login: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<string>();

  async function login(loginParams: LoginParams) {
    try {
      const token = (await apiClient.post("/auth", loginParams)) as string;

      setUser(token);
    } catch (error) {
      throw error.response.data;
    }
  }

  return { user, setUser, login };
}
