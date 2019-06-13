import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../../constants/media.js";

export const Container = styled(Link)`
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
  transition: 500ms;

  &:hover {
    background: #5b6eae;
    cursor: pointer;
    transition: 500ms;
  }

  ${media.mobile`
    width: 100%;
  `};
`;
