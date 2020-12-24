import styled from "styled-components";

// https://www.svgbackgrounds.com/#wavey-fingerprint
import light from "../../../../../assets/backgrounds/light.svg";
import dark from "../../../../../assets/backgrounds/dark.svg";
import sepia from "../../../../../assets/backgrounds/sepia.svg";

export const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// <!-- Take the theme background -->
// <!-- Enter in https://maketintsandshades.com/-->
// <!-- Select second value from left in top row -->

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => {
    switch (props.theme) {
      case "light":
        return `url(${light})`;
      case "dark":
        return `url(${dark})`;
      case "sepia":
        return `url(${sepia})`;
      default:
    }
  }};
`;

export const Microcopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
