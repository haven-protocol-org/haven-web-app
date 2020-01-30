import styled, { keyframes } from "styled-components";
import media from "../../../../assets/styles/media.js";
import { border } from "../../../../assets/styles/colors.js";

export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  background: #2b2e34;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #36393f;
  padding-top: 100px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='5' stroke-opacity='0.25'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");
`;

export const Microcopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
`;

export const HeadingWrapper = styled.div`
  width: 80%;
  height: auto;
  text-align: center;

  ${media.tablet`
    width: 90%;
  `};

  ${media.mobile`
    width: 98%;
  `};
`;

export const Heading = styled.h1`
  font-weight: 900;
  font-family: "Playfair Display", serif;
  font-size: 80px;
  color: #ffffff;
  letter-spacing: 0;

  ${media.tablet`
    font-size: 72px;
  `};

  ${media.mobile`
    font-size: ${props => (props.size ? `${props.size}` : "55px")}
  `};
`;

export const Buttons = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;

  ${media.mobile`
    flex-direction: column;
    width: 80%;
  `};
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  background: pink;
  font-size: 17px;
  color: white;
  letter-spacing: 0;
  line-height: 30px;
  text-align: ${props => (props.left ? "left" : "right")};
`;

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${props => (props.left ? "left" : "right")};
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.div`
  height: auto;
  border-bottom: 1px solid ${border};
  padding: 10px 20px;
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

export const Cell = styled.div`
  height: auto;
  width: auto;
  padding: 16px 20px;
  border-bottom: 1px solid #4a4d52;
`;

export const TableHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #4a4d52;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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

export const CellContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;
`;
