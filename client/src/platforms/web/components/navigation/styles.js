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

export const Scan = styled.div`
  font-size: 13px;
  border-radius: 4px;
  margin: 8px;
  height: 36px;
  background: ${(props) => props.theme.button.primary};
  color: ${(props) => props.theme.button.primary_label};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter-Regular;

  &:hover {
    cursor: pointer;
  }
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  text-align: center;
  font-size: 13px;
  padding: 8px;
  color: ${(props) => props.theme.type.secondary};
`;

export const Icon = styled(HavenIcon)`
  height: 24px;
  width: 24px;

  .color {
    fill: ${(props) => props.theme.type.primary};
  }
`;

export const Legal = styled.a`
  text-decoration: none;
`;

export const Haven = styled.div`
  color: ${(props) => props.theme.type.primary};
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
`;

export const Auth = styled(Link)`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const NoAuth = styled.a`
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

export const OptionsSVG = styled(OptionIcon)`
  .bg {
    fill: ${(props) => props.theme.type.secondary};
  }
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
  background: ${(props) => props.theme.body.foreground};
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
