import styled from "styled-components";

export const Container = styled.div`
  height: 32px;
  font-size: 13px;
  display: flex;
  margin: 8px;
`;

export const Tabs = styled.div`
  border: 1px solid ${(props) => props.theme.body.border};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  overflow: clip;
`;

export const Item = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) =>
    props.active ? props.theme.type.primary : props.theme.type.secondary}
  background: ${(props) =>
    props.active ? props.theme.body.active_menu : props.theme.body.foreground}

  &:hover {
    cursor: pointer;
  }
`;
