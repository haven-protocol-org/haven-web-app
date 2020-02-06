import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Wrapper = styled.div`
  width: auto;
  height: 100%;
  background: #36393f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
`;

export const Container = styled.div`
  max-width: 1400px;
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  padding: 80px;
  background: ${props => (props.reverse ? "#2b2e34" : "#36393F")};
  justify-content: center;
  align-items: center;

  ${media.laptop`
    grid-template-columns: 1fr;
    padding: 80px 20px;
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

export const Data = styled.div`
  margin-left: 16px;
`;

export const Cell = styled.div`
  display: grid;
  grid-template-columns: 16px 1fr;
  width: 100%;
  height: auto;
  background: ${props => props.theme.body.foreground};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.body.border};
  overflow: hidden;
  padding-right: 16px;
  margin-right: 20px;
`;

export const Complete = styled.div`
  width: 16px;
  height: 100%;
  background: #34d8ac;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Progress = styled.div`
  width: 16px;
  height: 100%;
  background: #1f8267;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Soon = styled.div`
  width: 16px;
  height: 100%;
  background: #155645;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const List = styled.li`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 26px;
  text-align: left;
  width: 100%;
  margin-top: 8px;
  margin-left: 16px;
`;

export const Label = styled.p`
  transform: rotate(-90deg);
  font-family: Inter-SemiBold;
  font-size: 10px;
  text-align: center;
  line-height: 16px;
  text-transform: uppercase;
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
  margin-top: -8px;
`;
