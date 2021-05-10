import styled, { keyframes } from "styled-components";
import media from "../../../assets/styles/media.js";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowUp } from "../../../assets/icons/arrow-up.svg";

const appear = keyframes`
  0% { transform: translateY(-20px);  }
  50% { transform: translateY(10px);  }
  100% {transform: translateY(0px);   }
`;

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
