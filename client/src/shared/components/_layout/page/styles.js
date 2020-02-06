import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #36393f;
  display: grid;
  grid-template-columns: 360px 1fr;
  position: fixed;
  align-items: center;
  justify-content: center;

  ${media.laptop`
    grid-template-columns: 100%;
  `}
`;
