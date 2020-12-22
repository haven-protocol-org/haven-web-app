import styled from "styled-components";
import media from "../../../assets/styles/media.js";

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: scroll;
`;

export const Placeholder = styled.div`
  min-height: 200px;
`;

export const Window = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 680px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Inner = styled.div`
  margin-top: -120px;
  width: 50%;
  min-width: 580px;
  background: ${(props) => props.theme.body.background}
  border-radius: 4px;

  ${media.tablet`
    min-width: 90%
  `}

  ${media.mobile`
    min-width: 90%
    margin-top: 20px;
  `}
`;

export const Header = styled.div`
  height: auto;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
  padding: 20px;
`;

export const Body = styled.div`
  width: auto;
  display: flex;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0px;
  justify-content: space-between;
`;

export const Confirm = styled.button`
  background: ${(props) => props.theme.button.primary};
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
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  width: auto;
  min-width: 128px;
  height: 48px;
  color: ${(props) => props.theme.type.secondary};
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
    color: ${(props) => props.theme.type.primary};
  }
`;
