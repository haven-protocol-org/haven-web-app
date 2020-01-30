import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Wrapper = styled.div`
  height: auto;
  width: 100%;
  background: red;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding: 80px;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  max-width: 1400px;

  justify-content: center;
  align-items: center;

  ${media.laptop`
    grid-template-columns: 1fr;
    padding: 80px 20px;
  `}
`;

export const Cell = styled.div`
  width: 100%;
  height: auto;
`;

export const Important = styled.div`
  width: auto;
  height: auto;
  background: #2b2e32;
  padding: 10px 20px;
  border-radius: 4px;
  border-left: 6px solid #34d8ac;
`;

export const Title = styled.h3`
  color: #fff;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
  width: 100%;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
  width: 100%;
`;

export const Heading = styled.div`
  font-weight: 900;
  font-family: "Playfair Display", serif;
  font-size: 60px;
  color: #fff;
  letter-spacing: 0;
  line-height: 90px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
  ${media.laptop`
    font-size: 58px;
    line-height: 78px;
  `};

  ${media.mobile`
    font-size: 52px;
    line-height: 56px;
  `};
`;
