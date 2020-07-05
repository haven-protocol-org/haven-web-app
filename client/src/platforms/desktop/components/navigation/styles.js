import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../../assets/styles/media.js";

export const Container = styled.header`
  height: 64px;
  z-index: 1000;
  position: fixed;
  width: 100vw;
  background: #26282c;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Haven = styled.div`
  color: white;
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
`;

export const Logo = styled.img`
  height: 24px;
  width: auto;
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
`;

export const OptionsIcon = styled.img`
  height: 24px;
  width: 24px;
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
  border-bottom: 1px solid ${(props) => props.theme.body.border};
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
  color: #26282c;
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
  background: #34d8ac;
  font-size: 10px;
  border-radius: 3px;
  margin-left: 12px;
  color: #26282c;
  background: ${(props) => (props.isActive ? "#2D8872" : "#F04747")};
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
  background: #7289da;
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
    background: #5b6eae;
    transition: 500ms;
  }
`;

export const Logout = styled.div`
  padding: 12px 26px;
  background: #7289da;
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
    background: #5b6eae;
    transition: 500ms;
  }
`;
