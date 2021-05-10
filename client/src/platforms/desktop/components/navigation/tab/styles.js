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
  overflow: hidden;
`;

export const Item = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.active ? props.theme.button.primary : props.theme.body.foreground};

  color: ${(props) =>
    props.active
      ? props.theme.button.primary_label
      : props.theme.type.secondary};

  &:hover {
    cursor: pointer;
  }
`;
