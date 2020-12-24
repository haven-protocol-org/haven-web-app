import styled from "styled-components";

export const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${(props) => props.theme.body.foreground};
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

export const Microcopy = styled.div`
  height: auto;
  width: auto;
`;
