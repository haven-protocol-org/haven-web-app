import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowUp } from "../../../../assets/icons/arrow-up.svg";
import { ReactComponent as HavenIcon } from "../../../../assets/icons/haven.svg";
import { ReactComponent as OptionIcon } from "../../../../assets/icons/options.svg";

const appear = keyframes`
  0% { transform: translateY(-20px);  }
  50% { transform: translateY(10px);  }
  100% {transform: translateY(0px);   }
`;

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

export const Haven = styled.div`
  color: ${(props) => props.theme.type.primary};
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 8px;
`;

export const Icon = styled(HavenIcon)`
  height: 24px;
  width: 24px;

  .color {
    fill: ${(props) => props.theme.type.primary};
  }
`;

export const OptionsSVG = styled(OptionIcon)`
  .bg {
    fill: ${(props) => props.theme.type.secondary};
  }
`;

export const Logo = styled.img`
  height: 24px;
  width: auto;
`;

export const Arrow = styled.div`
  height: auto;
  width: 20px;
  background: white;
  right: 8px;
  position: absolute;
  z-index: 999;
`;

export const Arr = styled(ArrowUp)`
  position: fixed;
  margin-top: -7px;

  .bg {
    fill: ${(props) => props.theme.body.foreground};
  }

  .outline {
    stroke: ${(props) => props.theme.body.border};
  }
`;

export const Options = styled.button`
  height: 64px;
  width: 64px;
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${(props) => props.theme.body.border};

  &:hover {
    cursor: pointer;
  }
`;

export const OptionsList = styled.div`
  height: auto;
  min-height: 140px;
  width: 280px;
  background: ${(props) => props.theme.body.foreground}
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  position: fixed;
  right: 12px;
  top: 74px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: ${appear} 0.5s forwards;
`;

export const OptionsIcon = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OptionsSingleRow = styled.div`
  height: auto;
  color: white;
  padding-left: 20px;
  padding: 16px;
  font-size: 14px;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.body.background};
    cursor: pointer;
  }
`;

export const OptionsDoubleRow = styled.div`
  height: auto;
  color: white;
  padding-left: 20px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.body.border};

  &:nth-last-child(1) {
    border-bottom: none;
  }
`;

export const Brand = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const Tag = styled.div`
  height: 22px;
  width: auto;
  font-size: 10px;
  color: ${(props) => props.theme.type.primary};
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 12px;
  padding-right: 12px;
  overflow: hidden;
`;

export const State = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  height: 22px;
  font-size: 10px;
  border-radius: 3px;
  margin-left: 12px;
  color: white;
  background: ${(props) =>
    props.isActive ? `${props.theme.states.success}` : "#F04747"};
`;

export const Wrapper = styled.div`
  height: auto;
  overflow: hidden;

  display: flex;

  flex-direction: column;
  border-radius: 3px;
  background: #34d8ac;

  z-index: 10000;

  &:hover {
    background: #2fc29b;
    cursor: pointer;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NetworkStatus = styled.div`
  display: flex;
  margin-left: 12px;
  width: auto;
`;

export const Button = styled(Link)`
  padding: 12px 26px;
  background: ${(props) => props.theme.button.primary};
  border: none;
  margin-right: 16px;
  height: auto;
  color: white;
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
  color: white;
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

// Notifications

export const Notifications = styled.button`
  height: 64px;
  width: 64px;
  background: none;
  border: none;
  outline: none;
  display: flex;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
  /* border-left: 1px solid ${(props) => props.theme.body.border};
  border-right: 1px solid ${(props) => props.theme.body.border}; */

  &:hover {
    cursor: pointer;
  }
`;

export const NotificationDropdown = styled.div`
  height: auto;
  min-height: 140px;
  width: 280px;
  background: ${(props) => props.theme.body.foreground}
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  position: fixed;
  left: 10px;
  top: 74px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  animation: ${appear} 0.5s forwards;
`;

export const NotificationArrow = styled.div`
  height: auto;
  width: 20px;
  background: white;
  left: 165px;
  position: absolute;
  z-index: 999;
`;

export const NotificationCell = styled.div`
  height: auto;
  color: white;
  padding-left: 20px;
  padding: 16px;
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.body.border};

  &:hover {
    cursor: pointer;
  }
`;
