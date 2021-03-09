import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secundary: string
      linearGradiente: string
      brand01: string
      brand02: string
      brand03: string
      gray02: string
    }
    breakpoint: {
      mobileS: string
      mobileM: string
      mobileL: string
      tablet: string
      laptop: string
      laptopL: string
      desktop: string
    }
  }
}
