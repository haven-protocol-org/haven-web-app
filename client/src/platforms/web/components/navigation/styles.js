import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as HavenIcon } from "../../../../assets/icons/haven.svg";

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

export const Icon = styled(HavenIcon)`
  height: 24px;
  width: 24px;

  .color {
    fill: ${(props) => props.theme.type.primary};
  }
`;

export const Tag = styled.div`
  padding: 4px 8px;
  background: #34d8ac;
  font-size: 10px;
  border-radius: 3px;
  margin-left: 12px;
  color: #26282c;
`;

export const Haven = styled.div`
  color: ${(props) => props.theme.type.primary};
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
`;

export const Brand = styled(Link)`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const Auth = styled.div`
  padding: 12px 26px;
  background: ${(props) => props.theme.button.primary};
  border: none;
  margin-right: 16px;
  height: auto;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.button.primary_hover};
    transition: 500ms;
  }
`;

export const Logout = styled.div`
  padding: 12px 26px;
  background: ${(props) => props.theme.button.primary};
  border: none;
  margin-right: 16px;
  height: auto;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.button.primary_hover};
    transition: 500ms;
  }
`;
