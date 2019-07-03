import styled from "styled-components";
import media from "../../../constants/media.js";
import * as _ from "../../../constants/colors.js";

export const Wrapper = styled.div`
  height: auto;
  background: #36393f;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const Container = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  background: #36393f;
  justify-content: center;
  align-items: center;
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

  ${media.laptop`
    font-size: 72px;
    line-height: 82px;
  `};

  ${media.mobile`
    font-size: 68px;
    line-height: 78px;
  `};
`;

export const Cell = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 20px;
  border-radius: 4px;
  background: ${_.background};
  border: 1px solid ${_.border};
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  background: #36393f;
  margin-bottom: 20px;
  border-radius: 100%;
`;

export const Title = styled.div`
  color: #fff;
  letter-spacing: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 26px;
`;

export const Description = styled.div`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
`;
