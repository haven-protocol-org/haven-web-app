import styled from "styled-components";
import media from "../../../assets/styles/media.js";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 10000;
  display: flex;
  align-itiems: center;
  justify-content: center;
  padding: 20px;
  overflow-y: hidden;
`;

export const Window = styled.div`
  width: 600px;
  max-height: 600px
  background: ${props => props.theme.body.foreground};
  background: green;
  color: white;

  border-radius: 4px;
`;

export const Header = styled.div`
  height: auto;
  border-bottom: 1px solid ${props => props.theme.body.border};
  padding: 20px;
`;

export const Body = styled.div`
  width: auto;
  display: flex;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: pink;
`;

export const Footer = styled.div`
  display: flex;

  padding: 20px;
  justify-content: space-between;
  background: red;
`;

export const Confirm = styled.button`
  background: ${props => props.theme.button.primary};
  border: none;
  width: auto;
  min-width: 128px;
  height: 48px;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  transition: 500ms;
  outline: none;
  font-size: 15px;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: #677bc4;
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;
export const Cancel = styled.button`
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
  width: auto;
  min-width: 128px;
  height: 48px;
  color: ${props => props.theme.type.secondary};
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  transition: 500ms;
  outline: none;
  font-size: 15px;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: #677bc4;
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
    transition: 500ms;
    color: ${props => props.theme.type.primary};
    background: ${props => props.theme.body.background};
  }
`;
