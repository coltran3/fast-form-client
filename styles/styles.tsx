import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    primary: '#009A93',
    secundary: '#59E0C2',
    linearGradiente:
      'linear-gradient(48.98deg, #009A93 3.78%, #59E0C2 148.23%)',
    brand01: '#009A93',
    brand02: '#004945',
    brand03: '#005955',
    gray02: '#6D7070',
  },

  breakpoint: {
    mobileS: '(max-width: 320px)',
    mobileM: '(max-width: 375px)',
    mobileL: '(max-width: 425px)',
    tablet: '(max-width: 768px)',
    laptop: '(max-width: 1024px)',
    laptopL: '(max-width: 1440px)',
    desktop: '(max-width: 2560px)',
  },
}

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  outline: none;
  box-sizing: border-box;
}
button{
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor:pointer;

}
a:link {
    font-weight: normal;
    text-decoration: none;
   
}
ul,
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  overflow-x: hidden;

}
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background:#fff;
  /* background:${theme.colors.linearGradiente}; */
  font-family: 'Poppins', sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}



`
export const Container = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;

  /* background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  animation: opacityContainer 500ms linear; */
`
