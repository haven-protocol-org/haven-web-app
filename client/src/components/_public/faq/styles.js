import styled from "styled-components";
import media from "../../../constants/media.js";

export const Container = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding: 80px;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};

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
