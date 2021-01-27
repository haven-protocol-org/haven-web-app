import styled from "styled-components";
import { Link } from "react-router-dom";

export const Body = styled.div`
  min-height: 264px;
  margin: 10px;
`;

export const Wrapper = styled.div`
  height: auto;
  margin-bottom: 10px;
`;

export const Url = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.type.primary};
`;

export const Submit = styled.button`
  background: ${(props) => props.theme.button.primary};
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.button.primary_label};
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
  border: none;
  outline: none;
  margin-right: left;

  &:hover {
    cursor: pointer;
    transition: 500ms;
    background: ${(props) => props.theme.button.primary_hover};
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;

export const Button = styled(Link)`
  background: ${(props) => props.theme.body.background};
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
  border: 1px solid ${(props) => props.theme.body.border};
  outline: none;
  margin-right: left;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    transition: 500ms;
    background: ${(props) => props.theme.body.foreground};
    color: ${(props) => props.theme.type.primary};
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;
