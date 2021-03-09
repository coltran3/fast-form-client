import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '../../styles/styles'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Fast Form</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
