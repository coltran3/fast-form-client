import React from "react";
import { Routes } from "./Routes";
import { createGlobalStyle } from "styled-components";

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
