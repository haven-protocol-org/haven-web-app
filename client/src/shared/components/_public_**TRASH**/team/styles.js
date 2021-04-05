import styled from "styled-components";
import media from "../../../../assets/styles/media.js";
import * as _ from "../../../../assets/styles/colors.js";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  background: #36393f;
  padding-top: 20px;
`;

export const Wrapper = styled.div`
  height: auto;
  width: 100%;
  background: #36393f;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
`;

export const Core = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  padding: 40px 20px;
  max-width: 1400px;
  background: #36393f;
  width: auto;
  justify-content: center;
  align-items: center;

  ${media.laptop`
    grid-template-columns: 1fr 1fr;

  `}

  ${media.mobile`
    grid-template-columns: 1fr;

  `}
`;

export const Contributors = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  padding: 40px 20px;
  background: #36393f;

  justify-content: center;
  align-items: center;

  ${media.laptop`
    grid-template-columns: 1fr 1fr;
    padding: 40px 20px;
  `}

  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 40px 20px;
  `}
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
    font-size: 58px;
    line-height: 78px;
  `};

  ${media.mobile`
    font-size: 52px;
    line-height: 56px;
  `};
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 4px;
  background: ${_.background};
  border: 1px solid ${_.border};
`;

export const Avatar = styled.img`
  height: 80px;
  width: 80px;
  background: white;
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
