import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.body.foreground};
  font-size: 40px;
  color: ${props => props.theme.type.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.img`
  height: 240px;
  width: 240px;
  fill: red;
`;

export const Title = styled.div`
  font-family: Inter-Regular;
  font-size: 20px;
  letter-spacing: 0;
  line-height: 30px;
  margin-top: 24px;
`;
