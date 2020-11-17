import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import media from "../../../../../../assets/styles/media.js";
import { background } from "../../../../../../assets/styles/colors.js";

const appear = keyframes`
  0% { transform: translateY(0px);  }
  25% { transform: translateY(4px);  }
  50% { transform: translateY(8px);  }
  75% { transform: translateY(4px);  }
  100% {transform: translateY(0px);   }
`;

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${background};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='5' stroke-opacity='0.25'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");

  ${media.mobile`
    padding-top: 50px;
  `}
`;

export const SubContainer = styled.div`
  height: auto;
  width: 624px;
  flex-direction: column;
  margin: 20px;
  border: 1px solid #3a4048;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);

  ${media.laptop`
    animation: none;
  `};
`;

export const Header = styled.div`
  height: auto;
  width: auto;
  padding: 20px;
  background: #36393f;
  border-bottom: 1px solid #3a4048;
`;

export const Tabs = styled.div`
  height: 40px;
  width: 100%;
  background: red;
  display: flex;
`;

export const Tab = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: ${(props) => (props.active ? "#36393F" : "#2B2E32")};
  color: ${(props) => (props.active ? "#ffffff" : "#8a8d90")};

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 20px;
  color: #fff;
  letter-spacing: 0;
  line-height: 30px;
`;

export const SubDescription = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
  line-height: 24px;
`;

export const Image = styled.img`
  height: auto;
  width: auto;
  z-index: 500;
  position: absolute;
  margin-left: -500px;

  ${media.laptop`
    margin-left: -500px;
 `};

  ${media.tablet`
   margin-left: -200px;

 `};

  ${media.mobile`
   margin-left: -100px;
 `};
`;

export const Heading = styled.div`
  font-size: 48px;
  color: white;
  line-height: 58px;
  text-align: center;
  font-weight: 700;
`;

export const Description = styled.div`
  font-size: 16px;
  color: #8a8d90;
  letter-spacing: 0;
  line-height: 28px;
  margin-top: 12px;
  margin-bottom: 24px;
  text-align: center;
`;

export const Button = styled(NavLink)`
  background: #7289da;
  border-radius: 4px;
  font-size: 16px;
  line-height: 36px;
  height: 56px;
  width: 196px;
  color: white;
  border: none;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  animation-duration: 5s;

  &:hover {
    background: #5b6eae;
    cursor: pointer;
    animation-duration: 4s;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
