import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-column: 1 / 3;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
`;

export const Nav = styled(Link)`
  height: auto;
  text-decoration: none;
`;

export const Row = styled.div`
  display: flex;
`;

export const Back = styled(Link)`
  font-family: Inter-Regular;
  font-size: 20px;
  color: ${(props) => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 30px;
  margin-right: 12px;
  text-decoration: none;
  transition: 750ms;

  &:hover {
    color: #fff;
    transition: 750ms;
    cursor: pointer;
  }
`;
