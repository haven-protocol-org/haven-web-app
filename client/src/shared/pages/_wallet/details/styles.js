import styled from "styled-components";

export const Container = styled.div`
  grid-column: 1 / 3;
  margin-top: -20px;
`;

export const History = styled.div`
  grid-column: 1 / 3;
  height: auto;
  width: 100%;
`;

export const NoTransactions = styled.img`
  height: 250px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Message = styled.div`
  font-size: 16px;
  font-family: Inter-Regular;
  color: ${props => props.theme.type.secondary};
  margin-top: 12px;
  text-align: center;
`;

export const EmptyState = styled.div`
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 1 / 3;
`;
