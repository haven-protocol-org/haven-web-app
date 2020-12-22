import styled, { keyframes } from "styled-components";

const fade = keyframes`
0% { opacity: 0; }
50% { opacity: 1; }
100% { opacity: 0; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  color: ${(props) => props.theme.type.primary};
  animation: ${fade} 2s ease infinite;
  opacity: 0;

  &:nth-child(1) {
    left: 0;
  }

  &:nth-child(2) {
    left: 12px;
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    left: 20px;
    animation-delay: 0.5s;
  }
`;
