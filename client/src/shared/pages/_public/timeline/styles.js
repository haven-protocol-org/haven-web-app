import styled from "styled-components";
import media from "../../../../assets/styles/media.js";
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
    font-size: 60px;
  `};
`;
