import styled from "styled-components";
import media from "../../../../assets/constants/media.js";
import { NavLink } from "react-router-dom";

const activeClassName = "selected";

export const Container = styled.div`
  background: ${props => props.theme.body.foreground};
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid ${props => props.theme.body.border};

  ${media.laptop`
    order: 3;
    height: 58px;
    width: 100%;
    padding-top: 0px;
    flex-direction: row;
    bottom: 0;
    position: fixed;
    z-index: 5000;
  `};
`;

export const Wrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Value = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${props => props.theme.type.secondary};
  font-family: Inter-Regular;
  margin-top: 12px;
`;

export const Pending = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.theme.type.secondary};
  font-family: Inter-Regular;
  margin-top: 12px;
  text-align: center;
  line-height: 1.7em;
`;

export const Amount = styled.div`
  font-size: 32px;
  font-family: Inter-Bold;
  color: ${props => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;

export const Overview = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.body.border};

  margin-top: 68px;

  ${media.laptop`
    display: none;
  `};
`;

export const Item = styled(NavLink).attrs({
  activeClassName
})`
  height: auto;
  color: ${props => props.theme.type.secondary};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid ${props => props.theme.body.border};
  text-decoration: none;
  font-size: 16px;
  transition: 500ms;

  &:hover {
    color: ${props => props.theme.type.primary};
    transition: 500ms;
  }

  &.${activeClassName} {
    border-left: 3px solid ${props => props.theme.body.active_menu};
    color: ${props => props.theme.type.primary};
  }

  ${media.laptop`
    width: calc(100vw / 3);
    height: auto;
    font-size: 13px;
    padding: 20px 8px;
    display: flex;
    background: none;
    align-items: center;
    justify-content: center;
    z-index: 5000;
    border-top: 1px solid ${props => props.theme.body.border};
    border-right: 1px solid ${props => props.theme.body.border};


    &.${activeClassName} {
      border-bottom: 1px solid ${props => props.theme.body.border};
      color: ${props => props.theme.type.primary};
      border-left: none;
    }

  `}
`;
