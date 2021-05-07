import styled, { keyframes } from "styled-components";
import media from "../../../../assets/styles/media.js";

import { Link } from "react-router-dom";
import { ReactComponent as ArrowUp } from "../../../../assets/icons/arrow-up.svg";
import { ReactComponent as HavenIcon } from "../../../../assets/icons/haven.svg";
import { ReactComponent as OptionIcon } from "../../../../assets/icons/options.svg";

const appear = keyframes`
  0% { transform: translateY(-20px);  }
  50% { transform: translateY(10px);  }
  100% {transform: translateY(0px);   }
`;

export const Container = styled.header`
  height: 64px;
  z-index: 1000;
  position: fixed;
  width: 100vw;
  background: ${(props) => props.theme.body.navigation};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
`;

export const Scan = styled.div`
  font-size: 13px;
  border-radius: 4px;
  margin: 8px;
  height: 36px;
  background: ${(props) => props.theme.button.primary};
  color: ${(props) => props.theme.button.primary_label};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter-Regular;

  &:hover {
    cursor: pointer;
  }
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  text-align: center;
  font-size: 13px;
  padding: 8px;
  color: ${(props) => props.theme.type.secondary};
`;

export const Icon = styled(HavenIcon)`
  height: 24px;
  width: 24px;

  .color {
    fill: ${(props) => props.theme.type.primary};
  }
`;

export const Legal = styled.a`
  text-decoration: none;
`;

export const Haven = styled.div`
  color: ${(props) => props.theme.type.primary};
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
`;

export const Auth = styled(Link)`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const NoAuth = styled.a`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionsSVG = styled(OptionIcon)`
  .bg {
    fill: ${(props) => props.theme.type.secondary};
  }
`;

export const Arrow = styled.div`
  height: auto;
  width: 20px;
  background: white;
  right: 8px;
  position: absolute;
  z-index: 999;
`;

export const Arr = styled(ArrowUp)`
  position: fixed;
  margin-top: -7px;

  .bg {
    fill: ${(props) => props.theme.body.foreground};
  }

  .outline {
    stroke: ${(props) => props.theme.body.border};
  }
`;

export const Options = styled.button`
  height: 64px;
  width: 64px;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${(props) => props.theme.body.border};

  &:hover {
    cursor: pointer;
  }
`;

export const OptionsList = styled.div`
  height: auto;
  min-height: 140px;
  width: 280px;
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  position: fixed;
  right: 12px;
  top: 74px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: ${appear} 0.5s forwards;
`;

export const OptionsIcon = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Search: Needs to be broken out into own component
export const SearchDropdown = styled.div`
  margin-right: 36px;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${media.tablet`
    display: none;
  `};
`;

export const SearchArrow = styled.div`
  height: auto;
  width: 20px;
  background: white;
  position: relative;
  z-index: 999;
  left: 16px;
  top: 26px;
  animation: ${appear} 0.5s forwards;
  display: ${(props) => (props.showSearch ? "inline" : "none")};
`;

export const SearchArr = styled(ArrowUp)`
  position: fixed;
  display: ${(props) => (props.showSearch ? "inline" : "none")};

  .bg {
    fill: ${(props) => props.theme.body.foreground};
  }

  .outline {
    stroke: ${(props) => props.theme.body.border};
  }
`;

export const SearchCell = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 12px 16px;
  color: ${(props) => props.theme.type.primary};
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  text-decoration: none;
  justify-content: space-between;

  &:hover {
    background: ${(props) => props.theme.body.background};
    cursor: pointer;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TokenLabel = styled.div`
  font-size: 16px;
  font-family: Inter-SemiBold;
  text-align: ${(props) => (props.right ? "right" : "left")};
  color: ${(props) => props.theme.type.primary};
`;

export const AssetLabel = styled.div`
  font-size: 16px;
  font-family: Inter-SemiBold;
  text-align: ${(props) => (props.right ? "right" : "left")};
  color: ${(props) => props.theme.type.primary};

  /* &::first-letter {
    text-transform: lowercase;
  } */
`;

export const TickerLabel = styled.div`
  font-size: 14px;
  margin-top: 4px;
  color: ${(props) => props.theme.type.secondary};
  text-align: ${(props) => (props.right ? "right" : "left")};
`;

export const EmptyLabel = styled.div`
  font-size: 15px;
  height: 56px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.type.secondary};
`;

export const SearchInput = styled.input`
  font-size: 14px;
  border-radius: 50px;
  padding-left: 16px;
  height: 41px;
  outline: none;
  border: 1px solid ${(props) => props.theme.body.border};
  color: ${(props) => props.theme.type.primary};
  background: ${(props) => props.theme.body.foreground};
  width: 350px;
  position: fixed;
  top: 10px;
`;

export const Results = styled.div`
  width: 368px;
  min-height: 52px;
  max-height: 300px;
  overflow: scroll;
  position: fixed;
  border-radius: 4px;
  background: ${(props) => props.theme.body.foreground};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin-top: 32px;
  display: ${(props) => (props.showSearch ? "inline" : "none")};
  border: 1px solid ${(props) => props.theme.body.border};
  overflow-x: hidden;
  animation: ${appear} 0.5s forwards;
`;
