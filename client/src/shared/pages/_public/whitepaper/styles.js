import styled from "styled-components";
import media from "../../../../assets/styles/media.js";
import { link, link_hover } from "../../../../assets/styles/colors.js";

import img from "../../../../assets/binary.svg";

export const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  height: 580px;
  width: auto;
  display: flex;
  flex-direction: column;
  background: #2b2e34;
  align-items: center;
  border-bottom: 1px solid #36393f;
  background-image: url(${img});
`;

export const Microcopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Heading = styled.div`
  font-weight: 900;
  font-family: "Playfair Display", serif;
  font-size: 80px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 90px;
  margin-left: 8px;
  max-width: 600px;
  text-align: center;

  ${media.laptop`
    width: 90%
    font-size: 72px;
    line-height: 82px;
  `};

  ${media.mobile`
    width: 90%
    font-size: 52px;
    line-height: 57px;
  `};
`;

export const Description = styled.div`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
`;

export const Row = styled.div`
  display: flex;
  width: auto;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};
  width: auto;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  height: auto;
  padding: 80px;

  ${media.laptop`
    flex-direction: column-reverse;
    width: auto;
    height: auto;
    padding: 10px 40px;
  `};
`;

export const Words = styled.div`
  height: auto;
  width: 50%;
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -50px;

  ${media.laptop`
    height: auto;
    width: 100%;
    background: pink;
  `};
`;

export const Image = styled.div`
  height: 512px;
  width: 50%;
  margin: 8px;
  border: 1px dashed #434446;
  display: flex;
  color: #8a8d90;
  justify-content: center;
  align-items: center;

  ${media.laptop`
    height: 512px;
    width: 100%;

  `}
`;

export const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 68px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 80px;
`;

export const LearnMore = styled.div`
  font-family: Inter-Regular;
  font-size: 16px;
  color: ${link};
  letter-spacing: 0;
  line-height: 26px;
  margin-top: 20px;
  transition: 1500ms;
  text-decoration: none;

  &:hover {
    color: ${link_hover};
    cursor: pointer;
    transition: 500ms;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  width: auto;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  height: auto;
  padding: 80px 80px 0px 80px;
`;

export const Product = styled.div`
  height: 512px;
  width: 100%;
  border: 1px dashed #434446;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8a8d90;

  ${media.laptop`
    height: 512px;
    width: 100%;

  `}
`;
