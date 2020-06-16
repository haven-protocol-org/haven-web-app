import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../assets/styles/media.js";

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

export const Wrapper = styled(Link)`
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  border-bottom: ${(props) =>
    props.lockedBalance > 0
      ? `1px solid ${(props) => props.theme.body.border}`
      : "none"};
  border-radius: ${(props) =>
    props.lockedBalance > 0 ? "4px 4px 4px 4px" : "4px 4px 0px 0px"};
  text-decoration: none;
  flex-direction: row;

  height: auto;
  display: flex;
  justify-content: space-between;

  ${media.laptop`
    grid-column: 1 / 3;
  `}

  ${media.mobile`
    grid-column: 1 / 3;
  `}
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

export const PendingWrapper = styled(Link)`
  border-top: 1px solid ${(props) => props.theme.body.border};
  text-decoration: none;
`;

export const PendingSpacer = styled.div`
  height: 4px;
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

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
  text-align: ${(props) => (props.left ? "left" : "right")};
`;
