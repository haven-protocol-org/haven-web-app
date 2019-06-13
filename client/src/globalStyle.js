import { createGlobalStyle } from "styled-components";

import interRegular from "./assets/fonts/Inter-Regular.ttf";
import semiBold from "./assets/fonts/Inter-SemiBold.ttf";
import interBold from "./assets/fonts/Inter-Bold.ttf";

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: 'Inter-Regular', 'Inter-Bold', serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'zero' 1

    @font-face {
     font-family: 'Inter-Regular';
     src: url(${interRegular});
  }

    @font-face {
     font-family: 'Inter-SemiBold';
     src: url(${semiBold});
  }

    @font-face {
     font-family: 'Inter-Bold';

     src: url(${interBold});
  }

  }`;
