import styled from "styled-components";
import media from "../../../constants/media.js";

export const Container = styled.div`
  background: clear;
  border-radius: 4px;
  font-size: 16px;
  line-height: 36px;
  height: 56px;
  width: 196px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: 500ms;

  &:hover {
    background: white;
    cursor: pointer;
    transition: 500ms;
    color: #7289da;
    font-weight: 500;
  }

  ${media.mobile`
    width: 100%;
  `};
`;
