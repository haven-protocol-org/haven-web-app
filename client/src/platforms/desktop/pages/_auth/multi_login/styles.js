import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: auto;
  min-height: auto;
  max-width: 624px;
  flex-direction: column;
  margin: 20px;
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
`;

export const Main = styled.div`
  min-height: auto;
  height: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  background: ${(props) => props.theme.body.background};
`;

export const Header = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.body.background};
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  border-radius: 3px 3px 0px 0px;
`;

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 20px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;

export const Description = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  line-height: 24px;
`;

export const Body = styled.div`
  height: 266px;
  width: auto;
  margin: 10px;
`;

export const Buttons = styled.div`
  height: auto;
  margin: 10px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: ${(props) =>
    props.buttons === "single" ? "flex-end" : "space-between"};
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
  visibility: ${(props) => (props.step < 3 ? "hidden" : "inherit")};
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

export const Footer = styled.div`
  height: 60px;
  border-top: 1px solid ${(props) => props.theme.body.border};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.body.background};
  border-radius: 0px 0px 4px 4px;
`;

export const Route = styled(Link)`
  font-family: Inter-SemiBold;
  font-size: 14px;
  color: ${(props) => props.theme.type.primary};
  text-decoration: none;
  margin-left: 8px;
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  text-decoration: none;
`;
