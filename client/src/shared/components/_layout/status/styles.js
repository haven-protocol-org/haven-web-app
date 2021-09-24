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

const timer = keyframes`
0% {
  transform: scaleX(1);
}
100% {
  transform: scaleX(0);
}
`;

export const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  bottom: ${(props) => props.count * 50 + "px"};
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
  font-family: Inter-Regular;
  color: white;
  margin: 12px 1vw;
  padding: 12px 1vw 0 1vw;
  width: 96vw;
  border-radius: 4px;
  text-align: center;
  background: ${(props) => props.theme.states[props.type]};
`;

export const TimerBar = styled.div`
  height: 8px;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 4px;
  margin-left: -1vw;
  margin-right: -1vw;
  background-color: rgba(0.5,0.5,0.5,0.15);
  animation: ${timer} ${(props) => props.duration*0.001}s normal;
  transform-origin: 0% 0%;
  animation-timing-function:linear;
  animation-fill-mode: forwards;
`;