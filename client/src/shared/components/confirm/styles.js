import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid ${(props) => props.theme.body.border};
`;

export const Message = styled.div`
  font-size: 14px;
  height: 20px;
  background: blue;
  align-self: center;
  color: ${(props) => props.theme.type.primary};
  margin-top: 4px;
`;

export const Checkbox = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.div``;
