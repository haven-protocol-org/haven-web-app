import styled from "styled-components";
import media from "assets/styles/media";

export const Container = styled.div`
  height: auto;
  display: grid;
  grid-column: 1 / 3;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  height: auto;

  flex-direction: column;
  align-items: center;
  justify-content: left;
  background: ${(props) => (props.type === "warning" ? props.theme.states.error : props.theme.states.success)};
  border: 1px solid ${(props) => props.theme.body.border};
  border-radius: 4px;
  padding: 16px;
`;

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 16px;
  color: ${(props) => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 28px;
`;

export const Message = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  text-align: center;
  color: ${(props) => props.theme.type.primary};
`;
