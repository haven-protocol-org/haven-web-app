import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: auto;
  width: 624px;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #3a4048;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
`;

export const Tabs = styled.div`
  height: 40px;
  width: 100%;
  background: #36393f;
  display: flex;
`;

export const Tab = styled.div`
  width: calc(100% / 3);
  border: 1px
  display: flex;
  align-items: center;
  justify-content: center;
  color:  ${props => (props.active ? "#fff" : "#8a8d90")};
  background: ${props => (props.active ? "#36393f" : "#313339")};
  border-top: none;
  transition: 500ms;

  &:hover {
  cursor: pointer;
  transition: 500ms;
  color: white;
  }

`;

export const Main = styled.div`
  background: #36393f;
  border-radius: 2px 2px 0px 0px;
  height: auto;
  padding: 10px;
`;

export const Header = styled.div`
  height: auto;
  width: auto;
  padding: 20px;
  background: #36393f;
  border-bottom: 1px solid #3a4048;
`;

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 20px;
  color: #fff;
  letter-spacing: 0;
  line-height: 30px;
`;

export const Description = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  line-height: 24px;
`;

export const Progress = styled.div`
  display: grid;
  background: #2b2e34;
  height: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

export const Step = styled.div`
  width: ${props =>
    (props.width === 1 ? "10%" : null) ||
    (props.width === 2 ? "50%" : null) ||
    (props.width === 3 ? "100%" : null)}
  background: #7289DA;
  height: auto;
  border-radius: 4px;
`;

export const Body = styled.div`
  height: 266px;
  width: auto;
  margin: 10px;
`;

export const Buttons = styled.div`
  height: auto;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Submit = styled.button`
  background: #7289da;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
    transition: 500ms;
    background: #5b6eae;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`;

export const Back = styled.div`
  background: #36393f;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3a4048;
  text-decoration: none;
  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #313339;
    transition: 500ms;
  }
`;

export const Cancel = styled(Link)`
  background: #36393f;
  border-radius: 4px;
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  width: 106px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3a4048;
  text-decoration: none;
  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #313339;
    transition: 500ms;
  }
`;

export const Footer = styled.div`
  height: 60px;
  border-top: 1px solid #3a4048;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #36393f;
  border-radius: 0px 0px 4px 4px;
`;

export const Route = styled(Link)`
  font-family: Inter-SemiBold;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  margin-left: 8px;
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  text-decoration: none;
`;
