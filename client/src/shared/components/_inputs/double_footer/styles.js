import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Fill = styled.button`
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
      background: background: ${(props) => props.theme.button.primary_hover};
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.button.primary_hover};
    transition: 500ms;
  }
`;

export const Outline = styled.button`
  visibility: ${(props) => (props.leftVisible ? "visible" : "hidden")}
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  width: auto;
  min-width: 128px;
  height: 50px;
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
    color: ${(props) => props.theme.type.secondary};

    &:hover {
      cursor: not-allowed;
      color: ${(props) => props.theme.type.secondary};
    }
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.type.primary};
    transition: 500ms;
  }
`;
