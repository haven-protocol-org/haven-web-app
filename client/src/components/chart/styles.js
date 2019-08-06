import styled from "styled-components";

export const Container = styled.div`
  grid-column: 1 / 3;
  max-height: 520px;
  height: 480px;
  overflow: hidden;
  display: flex;
  width: 100%;
  border-radius: 4px;
  padding: 1px;
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
`;

export const Placeholder = styled.div`
  grid-column: 1 / 3;
  max-height: 520px;
  height: 480px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  padding: 1px;
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
  color: ${props => props.theme.type.secondary};
`;

export const Message = styled.div`
  font-size: 16px;
  font-family: Inter-Regular;
  color: ${props => props.theme.type.secondary};
  margin-top: 12px;
`;
