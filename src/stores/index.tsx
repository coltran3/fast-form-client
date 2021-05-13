import { createContext, useContext, ReactNode, PropsWithChildren } from "react";
import { AuthState, useAuth } from "./useAuth";
import invariant from "tiny-invariant";
import { NotificationState } from "./useNotification";

export const AuthContext = createContext<AuthState | null>(null);

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  invariant(ctx, "você deve estar dentro do contexto para usar o contexto do auth");

  return ctx;
}

export function AuthStoreProvider(props: PropsWithChildren<ReactNode>) {
  const authState = useAuth();

  return <AuthContext.Provider value={authState}>{props.children}</AuthContext.Provider>;
}

export const NotificationContext = createContext<NotificationState | null>(null);

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);

  invariant(ctx, "você deve estar dentro do contexto para usar o context do notification");

  return ctx;
}

export function NotificationProvider(props: PropsWithChildren<{ value: NotificationState }>) {
  return <NotificationContext.Provider {...props} />;
}
