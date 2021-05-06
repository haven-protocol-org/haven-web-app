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

export const SearchDropdown = styled.div`
  margin-right: 20px;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${media.tablet`
    display: none;
  `};
`;

export const SearchCell = styled(Link)`
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 4px 16px;
  color: ${(props) => props.theme.type.primary};
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  text-decoration: none;
  /* background: ${(props) => props.theme.body.foreground}; */

  &:nth-last-child(1) {
    border-bottom: red;
  }

  &:hover {
    background: ${(props) => props.theme.body.background};
    cursor: pointer;
  }
`;

export const AssetLabel = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.type.primary};
`;

export const TickerLabel = styled.div`
  font-size: 15px;
  color: ${(props) => props.theme.type.secondary};
  margin-left: 8px;
`;

export const EmptyLabel = styled.div`
  font-size: 15px;
  margin: auto;
  color: ${(props) => props.theme.type.secondary};
`;

export const SearchInput = styled.input`
  font-size: 14px;
  border-radius: 50px;
  padding: 12px 16px;
  outline: none;
  border: 1px solid ${(props) => props.theme.body.border};
  color: ${(props) => props.theme.type.primary};
  background: ${(props) => props.theme.body.foreground};
  width: 350px;
  position: fixed;
  top: 9px;
`;

export const Results = styled.div`
  width: 350px;
  min-height: 52px;
  max-height: 300px;
  overflow: scroll;
  position: fixed;
  border-radius: 4px;
  background: ${(props) => props.theme.body.foreground};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin-top: 28px;
  display: ${(props) => (props.showSearch ? "inline" : "none")};
  border: 1px solid ${(props) => props.theme.body.border};
`;

export const OptionsIcon = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
