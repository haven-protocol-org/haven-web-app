import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  color: white;
  padding-left: 20px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.body.border};

  &:nth-last-child(1) {
    border-bottom: none;
  }
`;

export const Url = styled.a`
  text-decoration: none;
`;
