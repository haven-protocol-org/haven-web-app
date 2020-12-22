import { css } from "styled-components";

const sizes = {
  mobile: 575,
  tablet: 767,
  laptop: 991,
  desktop: 1400,
};

const media = Object.keys(sizes).reduce((finalMedia, size) => {
  return {
    ...finalMedia,
    [size]: function (...args) {
      return css`
        @media (max-width: ${sizes[size]}px) {
          ${css(...args)};
        }
      `;
    },
  };
}, {});

export default media;
