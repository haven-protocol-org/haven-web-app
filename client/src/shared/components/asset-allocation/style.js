import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  grid-column: 1 / 3;
  justify-content: left;
`;

export const DonutChart = styled("div")`
  svg {
    display: block;
  }
`;

export const Legend = styled("div")`
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 25px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      line-height: 20px;
      margin: 0;
      padding: 0;
    }
    span {
      line-height: 20px;
      vertical-align: middle;
    }
  }
`;
