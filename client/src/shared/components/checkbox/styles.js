import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Message = styled.div`
  font-size: 14px;
  height: 20px;
  align-self: center;
  color: ${(props) => props.theme.type.primary};
  margin-top: 4px;
`;

export const Row = styled.div`
  height: 20px;
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  margin-right: 3px;
`;
