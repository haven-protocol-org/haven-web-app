import styled from "styled-components";

export const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.body.foreground};
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #36393f;
`;

export const Microcopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
