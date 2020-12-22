import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../assets/styles/media.js";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron.svg";

export const ShortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 3;
  transition: 500ms;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    transition: 500ms;
  }
`;

export const Arrow = styled(ChevronIcon)`
  .bg {
    fill: ${(props) => props.theme.type.secondary};
  }
`;

export const Locked = styled(Link)`
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  text-decoration: none;
  flex-direction: row;

  height: auto;
  display: flex;
  justify-content: space-between;
`;

export const Unlocked = styled(Link)`
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  text-decoration: none;
  flex-direction: row;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

export const Route = styled.div`
  width: 20px;
  height: auto;
  display: flex;
  align-items: center;
  padding-right: 12px;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
`;

export const Column = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PendingWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.body.border};
  text-decoration: none;
`;

export const PendingSpacer = styled.div`
  height: 8px;
  background: ${(props) => props.theme.body.foreground};
  border-right: 1px solid ${(props) => props.theme.body.border};
  border-left: 1px solid ${(props) => props.theme.body.border};
`;

export const Pending = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 50px 0px 20px;
  background: ${(props) => props.theme.body.foreground};
  border-right: 1px solid ${(props) => props.theme.body.border};
  border-left: 1px solid ${(props) => props.theme.body.border};
`;

export const Balances = styled.div`
  display: flex;
  padding: 4px;
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 0px 0px 4px 4px;

  &:hover {
    cursor: pointer;
  }
`;

export const Asset = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;

export const Balance = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;

export const Ticker = styled.div`
  font-family: Inter-Regular;
  font-size: 17px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 30px;
  padding-left: 8px;

  ${media.mobile`
    padding-left: 0px;
    color: ${(props) => props.theme.type.primary};
    font-family: Inter-Bold;
  `}
`;

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 24px;
`;
