import {keyframes} from "styled-components";
import styled from "styled-components";
import media from "../../../../assets/styles/media";

const ticker = keyframes`
0% {
    transform: translate3d(100vw, 0, 0);
    visibility: visible;
  }


  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

export const Scroller = styled.div`
  height: 200px;
  margin-bottom:10px;
  width: 98vw;
  position:relative;
  //margin-top:auto;
  display: flex;
  -webkit-backface-visibility: hidden;
  overflow:hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
   position:absolute;
  bottom:0;
  width:9000px;
  justify-content:space-between;
  

  animation: ${ticker} 50s linear infinite;

  ${media.tablet`
    animation: ${ticker} 10s linear infinite;
  `}

  &:hover {
    animation-play-state: paused;
  }
`;

export const Cards = styled.div`


  min-width: 480px;
  background: #2b2e32;
  border: 1px solid #3a4048;
  //margin: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: 500ms;
  background: #2b2e32;
  border: 1px solid #3a4048;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.15);
  transition: 500ms;
  order:${props => props.ticker === 'XHV'? 1 : props.ticker === 'BTC'? 2:3};

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
  }
`;

