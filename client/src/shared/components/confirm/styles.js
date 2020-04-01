import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${props => props.theme.body.foreground};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.body.border};
`;

export const Message = styled.div`
  font-size: 14px;
  color: ${props => props.theme.type.primary};
`;

export const Checkbox = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const Check = styled.input`
  height: 20px;
  width: 20px;
`;

export const Description = styled.div`
  margin-bottom: 12px;
`;
