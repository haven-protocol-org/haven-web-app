import styled, { keyframes } from "styled-components";
import media from "../../../../assets/styles/media.js";

const load = keyframes`
0% {
  opacity: 0;
  transform: translateY(15px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

export const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  bottom: 0;
  position: absolute;
  animation: ${load} 0.5s alternate;

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

/* bottom: ${(props) => props.count * 50 + "px"}; */
// ${media.laptop`
//   order: 2;
//   margin-bottom: 60px;
// `}
