import { createGlobalStyle } from "styled-components";

import interRegularW from "./assets/fonts/Inter-Regular.woff";
import semiBoldW from "./assets/fonts/Inter-SemiBold.woff";
import interBoldW from "./assets/fonts/Inter-Bold.woff";

import interRegularW2 from "./assets/fonts/Inter-Regular.woff2";
import semiBoldW2 from "./assets/fonts/Inter-SemiBold.woff2";
import interBoldW2 from "./assets/fonts/Inter-Bold.woff2";

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: 'Inter-Regular', 'Inter-Bold', serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'zero' 1;

    @font-face {
     font-family: 'Inter-Regular';
     font-display: swap;
     src: url(${interRegularW2}) format("woff2"),
       url(${interRegularW}) format("woff");
  }

    @font-face {
     font-family: 'Inter-SemiBold';
     font-display: swap;
     src: url(${semiBoldW2}) format("woff2"),
       url(${semiBoldW}) format("woff");
  }

    @font-face {
     font-family: 'Inter-Bold';
       font-display: swap;
     src: url(${interBoldW2}) format("woff2"),
       url(${interBoldW}) format("woff");
  }

  }`;
