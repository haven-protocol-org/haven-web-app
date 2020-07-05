import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
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

export const Content = styled.div`
  height: auto;
  font-size: 14px;
  color: white;
  margin: 12px;
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  background: ${(props) => props.theme.states[props.type]};
`;
