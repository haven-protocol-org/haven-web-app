import styled from "styled-components";
import media from "../../../constants/media.js";

export const Container = styled.div`
  grid-column: 1 / 3;
  margin-top: -20px;
`;

export const History = styled.div`
  grid-column: 1 / 3;
  height: auto;
  width: 100%;
`;

export const Row = styled.div`
  display: grid;
  grid-column: 1 / 3;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  height: auto;

  ${media.tablet`
    grid-template-columns: 1fr;
  `}
`;

export const Message = styled.div`
  font-size: 16px;
  font-family: Inter-Regular;
  color: ${props => props.theme.type.secondary};
  margin-top: 12px;
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
