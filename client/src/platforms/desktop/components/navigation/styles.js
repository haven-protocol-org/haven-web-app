import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../../assets/styles/media.js";

export const Container = styled.header`
  height: 64px;
  z-index: 1000;
  position: fixed;
  width: 100vw;
  background: #26282c;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  height: 24px;
  width: auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  height: auto;
  overflow: hidden;

  display: flex;

  flex-direction: column;
  border-radius: 3px;
  background: #34d8ac;

  z-index: 10000;
  width: 100px;

  &:hover {
    background: #2fc29b;
    cursor: pointer;
  }
`;

export const Network = styled.div`
  position: fixed;
  background: #34d8ac;
  border-radius: 3px;

  top: 50px;
  z-index: 10000;
  width: 100px;
  overflow: hidden;
`;

export const NetworkStatus = styled.div`
  display: flex;
  margin-left: 12px;
  width: auto;
`;

export const Tag = styled.div`
  height: 22px;

  font-size: 10px;
  color: #26282c;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 12px;
  padding-right: 12px;
  overflow: hidden;

  ${media.mobile`
     font-size: 8px
   `};

  &:hover {
    background: #2fc29b;
    cursor: pointer;
    overflow: hidden;
  }
`;

export const Dropdown = styled.div`
  height: 22px;
  width: 22px;
  /* border-left: 1px solid #249778; */
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => (props.show_networks ? `0deg` : `180deg`)});
  transition: 200ms;
`;

export const Chevron = styled.div`
  height: 12px;
  width: 12px;
  transform: rotate(180deg);
`;

export const Stripe = styled.div`
    min-height:20px
    min-width: 5px;
    margin-right:0px;
    margin-left:6px;
    background:${props => (props.isActive ? "#2D8872" : "#F04747")}
`;

export const State = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  height: 22px;
  background: #34d8ac;
  font-size: 10px;
  border-radius: 3px;
  margin-left: 12px;
  color: #26282c;
  background: ${props => (props.isActive ? "#2D8872" : "#F04747")}
    ${media.mobile`
     font-size: 8px
   `};
`;

export const Haven = styled.div`
  color: white;
  font-size: 20px;
  font-family: "Inter-Bold";
  margin-left: 12px;
`;

export const Brand = styled(Link)`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
`;

export const Theme = styled.div`
  padding: 12px 26px;
  background: #7289da;
  border: none;
  margin-right: 16px;
  height: auto;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;

export const Button = styled(Link)`
  padding: 12px 26px;
  background: #7289da;
  border: none;
  margin-right: 16px;
  height: auto;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;
export const Logout = styled.div`
  padding: 12px 26px;
  background: #7289da;
  border: none;
  margin-right: 16px;
  height: auto;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;
