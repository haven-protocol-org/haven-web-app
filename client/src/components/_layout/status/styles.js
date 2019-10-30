import styled from "styled-components";
import media from "../../../constants/media.js";

// background: ${props => props.theme.states[props.type]};

export const Container = styled.div`
  height: 40px;
  width: 100vw;
  background: #2D8872;
  color: white;
  display: flex;
  font-size: 16px
  justify-content: center;
  align-items: center;
  z-index: 1000;
  bottom: 0;
  position: absolute;

  ${media.laptop`
    order: 2;
    margin-bottom: 60px;
  `}
`;
