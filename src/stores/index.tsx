import { createContext, useContext, ReactNode, PropsWithChildren } from "react";
import { AuthState, useAuth } from "./useAuth";
import invariant from "tiny-invariant";

export const AuthContext = createContext<AuthState | null>(null);

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  invariant(ctx, "você deve estar dentro do contexto para usar invariant");

  return ctx;
}

export function AuthStoreProvider(props: PropsWithChildren<ReactNode>) {
  const { user, setUser } = useAuth();

  return <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>;
}
