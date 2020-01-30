import styled from "styled-components";

export const Container = styled.div`
  height: 52px;
  width: 100%;
  background: ${props => props.theme.button.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
