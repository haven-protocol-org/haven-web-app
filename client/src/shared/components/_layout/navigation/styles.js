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

export const Tag = styled.div`
  padding: 4px 8px;
  background: #34d8ac;
  font-size: 10px;
  border-radius: 3px;
  margin-left: 12px;
  color: #26282c;

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
  margin-left: 20px;
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
  margin-right: 20px;

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
