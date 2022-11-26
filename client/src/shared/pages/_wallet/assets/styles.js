import styled from "styled-components";
import media from "assets/styles/media";

export const Row = styled.div`
  width:100%;
  display: grid;
  grid-column: 1 / 2;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  height: auto;

  ${media.tablet`
    grid-template-columns: 1fr;
  `}
`;