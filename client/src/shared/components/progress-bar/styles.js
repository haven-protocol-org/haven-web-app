import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 20px;
`;

export const Progress = styled.div`
  height: 100%;
  border-radius: 12px;
  background: ${props => props.theme.button.primary};
  width: ${props => props.width + `%`};
`;
