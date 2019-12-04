import styled from "styled-components";

export const Container = styled.div`
  height: auto;

  display: flex;
  justify-content: space-between;
`;

export const Message = styled.div`
  font-size: 14px;
  color: ${props => props.theme.type.primary};
`;

export const Checkbox = styled.div`
  height: 20px;
  width: 20px;
`;

export const Check = styled.input`
  height: 20px;
  width: 20px;
`;
