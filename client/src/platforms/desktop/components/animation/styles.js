import styled, { keyframes } from "styled-components";
import { ReactComponent as Fan } from "./fan.svg";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  grid-column: 100%;
  display: grid;
  grid-column: 1 / 3;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.body.border};
  background: ${(props) => props.theme.body.foreground};
  margin-bottom: 40px;
`;

export const Brand = styled.div`
  width: auto;
  display: flex;
`;

export const Logo = styled.img`
  height: 24px;
  width: auto;
`;

export const Gpu = styled.div`
  color: ${(props) => props.theme.type.primary};
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
  text-transform: uppercase;
`;

export const Image = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;

  ${media.tablet`
    display: ${(props) => props.hide === "true" && "none"}
 `};
`;

export const Grid = styled.div`
  display: grid;
  height: auto;
  padding: 16px 16px 0px 16px;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;

  ${media.tablet`
    grid-template-columns: 1fr  ;
 `};

  ${media.mobile`
    grid-template-columns: 1fr ;
 `};
`;

export const rotate = keyframes`
  from { transform: rotate(0deg);}
  to { transform: rotate(360deg);}
`;

export const fade = keyframes`
  0% {stroke:#34d8ac;}
  50% {stroke: #155645;}
  100% {stroke:#34d8ac;}
`;

export const Column = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  height: 36px;
`;

export const Header = styled.div`
  height: auto;
  padding: 16px;
  font-size: 24px;
  width: auto;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Status = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.type.secondary};
  text-align: right;
`;

export const Hashes = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.type.primary};
  text-align: right;
`;

export const Active = styled(Fan)`
  flex: 1;
  height: 256px;
  border: 1px solid ${(props) => props.theme.body.border};
  background: ${(props) => props.theme.body.background};
  border-radius: 2px;
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;

  .center-piece {
    fill: ${(props) => props.theme.body.background};
  }

  .lines {
    animation: ${fade} infinite 5s linear;
  }

  .outline {
    width: 150px;
    height: 150px;
    bottom: 0;
  }

  .fans {
    animation: ${rotate} infinite 1s linear;
    transform-origin: center;
  }
`;

export const Inactive = styled(Fan)`
  flex: 1;
  height: 256px;
  border: 1px solid ${(props) => props.theme.body.border};
  background: ${(props) => props.theme.body.background};
  border-radius: 2px;
  display: flex;
  padding: 12px;
  align-items: center;
  justify-content: center;

  .center-piece {
    fill: ${(props) => props.theme.body.background};
  }
`;

export const Footer = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px;
`;

export const RemoteNode = styled.div`
  padding: 8px 20px;
`;

export const Indicator = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 12px;
  background:${(props) => (props.mining === "Mining" ? "#34d8ac" : "#F04747")}
  margin-right: 4px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
