import styled from "styled-components";
import media from "../../../../../assets/styles/media.js";
import { NavLink } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "../../../../../assets/icons/chevron.svg";

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
  margin-bottom: 7px;

  ${media.laptop`
    display: none;
    margin-bottom: 0px;
  `};
`;

export const Wrapper = styled.div`
  width: 100%;
  background ${(props) => props.theme.body.foreground};


  ${media.laptop`
    width: 25%;
  `};
`;

export const Icon = styled.img`
  height: 24px;
  width: 24px;
  background: white;
`;

export const Item = styled(NavLink).attrs({
  activeClassName,
})`
  height: auto;
  color: ${(props) => props.theme.type.secondary};
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 12px;
  padding: 20px;
  border-radius: 8px;
  transition: 250ms;

  &:hover {
    color: ${(props) => props.theme.type.primary};
    cursor: pointer;
    transition: 250ms;
  }

  &.${activeClassName} {
    margin: 4px 12px;
    padding: 20px;
    color: ${(props) => props.theme.button.primary_label};
    background: ${(props) => props.theme.button.primary};
    transition: 250ms;
    border-radius: 8px;

    &:hover {
      background: ${(props) => props.theme.button.primary_hover};
      transition: 250ms;
    }
  }

  ${media.laptop`
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    z-index: 5000;
    margin: 0px
    border-radius: 0px;
    border-top: 1px solid ${(props) => props.theme.body.border};
    border-right: 1px solid ${(props) => props.theme.body.border};


    &.${activeClassName} {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 58px;
      margin: 0px;
      padding: 0px;
      border-radius: 0px;
      color: ${(props) => props.theme.type.primary};
      background: none;
      border-top: 3px solid ${(props) => props.theme.button.primary};
      text-align: center;

      &:hover {
        background: none;
      }
    }

  `}
`;
