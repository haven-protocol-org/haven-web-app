import styled from "styled-components";
import media from "../../../../assets/styles/media";
import { Link } from "react-router-dom";

export const Cards = styled(Link)`
  border-bottom: 1px solid #4a4d52;
  width: auto;
  order: ${props =>
    props.ticker === "XHV" ? 1 : props.ticker === "BTC" ? 2 : 3};
  text-decoration: none;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

export const ColumnData = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 20px;

  ${media.mobile`
    display: none;
  `}
`;

export const Cell = styled.div`
  display: flex;
  width: auto;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #4a4d52;
  transition: 500ms;

  &:hover {
    background: #343a41;
    cursor: pointer;
    transition: 500ms;
  }
`;

export const Row = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;

export const Data = styled.div`
  display: flex;

  width: auto;
  height: auto;
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: white;
  text-align: ${props => (props.right ? "right" : "left")};

  letter-spacing: 0;
  line-height: 30px;
`;

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${props => (props.right ? "right" : "left")};
`;

export const Table = styled.div`
  height: auto;
  width: 90%;
  background: #3a4048;
  max-width: 1200px;
  margin-top: 80px;
  border-radius: 4px;
  max-width: 1400px;

  margin-bottom: 50px;
  border: 1px solid #4a4d52;
`;

export const TableFooter = styled(Link)`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;

  &:hover {
    background: #343a41;
    cursor: pointer;
    transition: 500ms;
  }
`;
export const CellTitle = styled.div`
  font-family: Inter-Bold;
  font-size: 20px;
  color: #fafafa;
  letter-spacing: 0;
  line-height: 36px;
  text-align: ${props => (props.left ? "left" : "right")};
`;

export const CellSubtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 24px;
`;

export const TableHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #4a4d52;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
