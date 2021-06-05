import styled from "styled-components";
import media from "../../../../../assets/styles/media.js";
import { NavLink } from "react-router-dom";

import { ReactComponent as AssetIcon } from "../../../../../assets/menu/assets.svg";
import { ReactComponent as ConvertIcon } from "../../../../../assets/menu/convert.svg";
import { ReactComponent as TransferIcon } from "../../../../../assets/menu/transfer.svg";
import { ReactComponent as SettingsIcon } from "../../../../../assets/menu/settings.svg";
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

export const Asset = styled(AssetIcon)`
  height: 24px;
  width: 24px;

  .dark_border {
    fill: ${(props) =>
      props.item === "assets"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "assets" ? 1 : 0.5)};
  }

  .light_border {
    fill: ${(props) =>
      props.item === "assets"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "assets" ? 0.5 : 0.3)};
  }

  ${media.laptop`

    .dark_border {
      fill: ${(props) => props.item === "assets" && props.theme.type.primary};
      fill-opacity: ${(props) => (props.item === "assets" ? 1 : 0.5)};
    }

    .light_border {
      fill: ${(props) => props.item === "assets" && props.theme.type.secondary};
      fill-opacity: ${(props) => (props.item === "assets" ? 0.8 : 0.3)};
    }

  `};
`;

export const Convert = styled(ConvertIcon)`
  height: 24px;
  width: 24px;

  .dark_border {
    fill: ${(props) =>
      props.item === "convert"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "convert" ? 1 : 0.5)};
  }

  .light_border {
    fill: ${(props) =>
      props.item === "convert"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "convert" ? 0.5 : 0.3)};

    ${media.laptop`

      .dark_border {
        fill: ${(props) =>
          props.item === "convert" && props.theme.type.primary};
        fill-opacity: ${(props) => (props.item === "convert" ? 1 : 0.5)};
      }

      .light_border {
        fill: ${(props) =>
          props.item === "convert" && props.theme.type.secondary};
        fill-opacity: ${(props) => (props.item === "convert" ? 0.8 : 0.3)};
      }

    `};
  }
`;

export const Transfer = styled(TransferIcon)`
  height: 24px;
  width: 24px;

  .dark_border {
    fill: ${(props) =>
      props.item === "transfer"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "transfer" ? 1 : 0.5)};
  }

  .light_border {
    fill: ${(props) =>
      props.item === "transfer"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "transfer" ? 0.5 : 0.3)};
  }

  ${media.laptop`

    .dark_border {
      fill: ${(props) => props.item === "transfer" && props.theme.type.primary};
      fill-opacity: ${(props) => (props.item === "transfer" ? 1 : 0.5)};
    }

    .light_border {
      fill: ${(props) =>
        props.item === "transfer" && props.theme.type.secondary};
      fill-opacity: ${(props) => (props.item === "transfer" ? 0.8 : 0.3)};
    }

  `};
`;

export const Settings = styled(SettingsIcon)`
  height: 24px;
  width: 24px;

  .dark_border {
    fill: ${(props) =>
      props.item === "settings"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "settings" ? 1 : 0.5)};
  }

  .light_border {
    fill: ${(props) =>
      props.item === "settings"
        ? props.theme.type.inverse
        : props.theme.type.primary};
    fill-opacity: ${(props) => (props.item === "settings" ? 0.5 : 0.3)};
  }

  ${media.laptop`

    .dark_border {
      fill: ${(props) => props.item === "settings" && props.theme.type.primary};
      fill-opacity: ${(props) => (props.item === "settings" ? 1 : 0.5)};
    }

    .light_border {
      fill: ${(props) =>
        props.item === "settings" && props.theme.type.secondary};
      fill-opacity: ${(props) => (props.item === "settings" ? 0.8 : 0.3)};
    }

  `};
`;

export const Chevron = styled(ChevronIcon)`
  height: 12px;
  width: 12px;

  ${media.laptop`
    display: none;
  `}

  .chevron_color {
    fill: ${(props) => props.theme.type.inverse};
  }
`;

export const ChevronInactive = styled(ChevronIcon)`
  height: 12px;
  width: 12px;

  ${media.laptop`
    display: none;
  `}

  .chevron_color {
    fill: ${(props) => props.theme.type.secondary};
  }
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
  background: ${(props) => props.theme.body.foreground};

  ${media.laptop`
    width: 25%;
  `};
`;

export const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

export const Label = styled.div`
  margin-left: 12px;
  margin-top: 2px;

  ${media.laptop`
    margin: auto;
    font-size: 12px;
    padding-top: 4px;

  `}
`;

export const Aligner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${media.laptop`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
  `}
`;

export const Item = styled(NavLink).attrs({
  activeClassName,
})`
  height: auto;
  color: ${(props) => props.theme.type.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 12px;
  padding: 20px;
  border-radius: 8px;
  transition: 350ms;
  font-family: Inter-Regular;

  &:hover {
    cursor: pointer;
    transition: 350ms;
    background: ${(props) => props.theme.body.background};
  }

  &.${activeClassName} {
    margin: 4px 12px;
    padding: 20px;
    color: ${(props) => props.theme.button.primary_label};
    background: ${(props) => props.theme.button.primary};
    transition: 350ms;
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
    z-index: 5000;
    margin: 0px;
    height: 60px;
    padding: 0px;
    border-radius: 0px;
    border-top: 1px solid ${(props) => props.theme.body.border};
    border-right: 1px solid ${(props) => props.theme.body.border};


    &.${activeClassName} {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      margin: 0px;
      padding: 0px;
      border-radius: 0px;
      color: ${(props) => props.theme.type.primary};
      background: none;
      border-top: 2px solid ${(props) => props.theme.button.primary};
      text-align: center;

      &:hover {
        background: none;
      }
    }

  `}
`;
