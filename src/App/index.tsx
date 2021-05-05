import React from "react";
import { Routes } from "./Routes";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    color:  black;
    height: 100vh;
  }
`;

export function App() {
  return (
    <>
      <React.Suspense fallback={null}>
        <GlobalStyle />
        <Routes />
      </React.Suspense>
    </>
  );
}
