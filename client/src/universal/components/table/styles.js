import styled from "styled-components";
import * as _ from "../../../assets/styles/colors.js";

export const Container = styled.div`
  height: auto;
  width: auto;
  border: 1px solid ${_.border};
  border-radius: 4px;
  margin: 16px;
`;

export const Header = styled.div`
  height: auto;
  padding: 20px
  font-family: Inter-Bold;
  font-size: 17px;
  color: #ffffff;
  letter-spacing: 0;

`;

export const Cell = styled.div`
  width: auto;
  height: auto;
  border-top: 1px solid ${_.border};
  background: ${_.background};
  padding: 20px;
`;

export const Heading = styled.div`
  font-family: Inter-SemiBold;
  font-size: 17px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 27px;
  text-align: ${props => (props.right ? "right" : "left")};
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  line-height: 24px;
  text-align: ${props => (props.right ? "right" : "left")};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: auto;
`;
