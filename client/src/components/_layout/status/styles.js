import styled from "styled-components";
import media from "../../../constants/media.js";

export const Container = styled.div`
  height: 30px;
  width: 100vw;
  background: #34d8ac;
  color: white;
  display: flex;
  font-size: 13px
  justify-content: center;
  align-items: center;
  z-index: 1000;
  bottom: 0;
  position: absolute;


  ${media.tablet`
    order: 2;
    margin-bottom: 60px;
  `}

  ${media.laptop`
    order: 2;
    margin-bottom: 60px;
  `}
`;
