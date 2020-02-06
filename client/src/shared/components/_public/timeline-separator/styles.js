import styled from "styled-components";

export const Separator = styled.div`
  height: auto;
  width: 100%;
`;

export const Line = styled.div`
  height: 20px;
  width: 1px;
  background: #2b2e34;
  margin-left: 33px;
`;

export const Circle = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 24px;
  border: 1px solid #2b2e34;
  background: ${props =>
    props.complete === "complete" ? `${props.theme.states.success}` : null};
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  height: 16px;
  width: 16px;
`;
