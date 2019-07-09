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
