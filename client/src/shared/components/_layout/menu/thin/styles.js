import styled from "styled-components";
import media from "../../../../../assets/styles/media.js";
import { NavLink } from "react-router-dom";

const activeClassName = "selected";

export const Container = styled.div`
  background: ${(props) => props.theme.body.foreground};
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid ${(props) => props.theme.body.border};

  ${media.laptop`
    order: 3;
    height: 58px;
    width: auto;
    padding-top: 0px;
    flex-direction: row;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 5000;
  `};
`;

export const Value = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
  font-family: Inter-Regular;
  margin-top: 12px;
`;

export const Overview = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.body.border};

  margin-top: 68px;

  ${media.laptop`
    display: none;
  `};
`;

export const Item = styled(NavLink).attrs({
  activeClassName,
})`
  height: auto;
  color: ${(props) => props.theme.type.secondary};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  text-decoration: none;
  font-size: 16px;
  transition: 500ms;

  &:hover {
    color: ${(props) => props.theme.type.primary};
    transition: 500ms;
    cursor: pointer;
  }

  &.${activeClassName} {
    border-left: 3px solid ${(props) => props.theme.body.active_menu};
    color: ${(props) => props.theme.type.primary};
    transition: none;
  }

  ${media.laptop`
    width: calc(100vw / 4);
    height: auto;
    font-size: 13px;
    padding: 20px 8px;
    display: flex;
    background: none;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    border-top: 1px solid ${(props) => props.theme.body.border};
    border-right: 1px solid ${(props) => props.theme.body.border};


    &.${activeClassName} {
      color: ${(props) => props.theme.type.primary};
      border-left: none;
      border-top: 3px solid ${(props) => props.theme.body.active_menu};

    }

  `}
`;
