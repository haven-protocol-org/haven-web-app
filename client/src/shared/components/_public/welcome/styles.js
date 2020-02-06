import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../../assets/styles/media.js";

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 80px;
  max-width: 1400px;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  justify-content: center;
  align-items: center;

  ${media.laptop`
    grid-template-columns: 1fr;
    padding: 80px 20px;
  `}
`;

export const Title = styled.h3`
  color: #fff;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
  width: 100%;
`;

export const Header = styled.div`
  font-weight: 900;
  font-family: "Playfair Display", serif;
  font-size: 60px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 80px;
  margin-bottom: 40px;
`;

export const Image = styled.img`
  width: 80%;
  height: 80%;
`;

export const Test = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  order: ${props => (props.reverse ? 2 : 1)};

  ${media.laptop`
    order: ${props => props.reverse || 2};
  `}
`;

export const Words = styled.div`
  height: 600px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  order: ${props => (props.reverse ? 1 : 2)};

  ${media.laptop`
    order: ${props => props.reverse || 1};
    height: auto;
    justify-content: flex-start;
  `}
`;

export const LearnMore = styled(Link)`
  font-family: Inter-Regular;
  font-size: 16px;
  color: #34d8ac;
  letter-spacing: 0;
  line-height: 26px;
  margin-top: 20px;
  transition: 1500ms;
  text-decoration: none;

  &:hover {
    color: #2aad8a;
    cursor: pointer;
    transition: 500ms;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
  width: 100%;
`;
