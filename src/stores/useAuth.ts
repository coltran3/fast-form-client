import { useState, Dispatch, SetStateAction } from "react";

export interface AuthState {
  user?: string;
  setUser: Dispatch<SetStateAction<string | undefined>>;
}

export function useAuth() {
  const [user, setUser] = useState<string>();

  return { user, setUser };
}
