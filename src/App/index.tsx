import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AuthStoreProvider, useAuthContext, NotificationProvider } from "../stores/";
import { LoggedRoutes, OpenRoutes } from "./Routes/";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { useNotification } from "../stores/useNotification";

const GlobalStyle = createGlobalStyle`
  html, 
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background:#fff;
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export function App() {
  const notificationState = useNotification();

  return (
    <>
      <React.Suspense fallback={null}>
        <GlobalStyle />
        <AuthStoreProvider>
          <NotificationProvider value={notificationState}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={theme}>
                <AuthResolver />
                <Snackbar
                  open={Boolean(notificationState.message)}
                  autoHideDuration={6000}
                  onClose={notificationState.handleClose}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={notificationState.handleClose}
                    severity={notificationState.type}
                  >
                    {notificationState.message}
                  </MuiAlert>
                </Snackbar>
              </ThemeProvider>
            </QueryClientProvider>
          </NotificationProvider>
        </AuthStoreProvider>
      </React.Suspense>
    </>
  );
}

export function AuthResolver() {
  const { user } = useAuthContext();

  if (user) {
    return <LoggedRoutes />;
  }

  return <OpenRoutes />;
}
