import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '../../styles/styles'
import { TopBar } from '../components/TopBar'
import { Container } from '../components/Container'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Fast Form</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container>
          <TopBar />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default MyApp
