import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "../../constants/media.js";

export const Container = styled(Link)`
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
  padding: 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: 500ms;
  grid-column: ${props => (props.fullWidth ? "1 / 3" : null)}

  ${media.laptop`
    grid-column: 1 / 3;
  `}

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.body.foreground};
    border: 1px solid ${props => props.theme.body.border};
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: 500ms;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-family: Inter-Bold;
  font-size: 17px;
  color: ${props => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
  text-align: ${props => (props.left ? "left" : "right")};
`;

export const Subtitle = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${props => props.theme.type.secondary};
  letter-spacing: 0;
  line-height: 24px;
  text-align: ${props => (props.left ? "left" : "right")};
`;
