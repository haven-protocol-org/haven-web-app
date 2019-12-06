import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  grid-column: ${props => (props.width ? "1 / 3" : null)};

  ${media.mobile`
    grid-column: 1 / 3;
  `};
`;

export const Wrapped = styled.div`
  width: auto;
  background: ${props => props.theme.input.input_background};
  border: 1px solid ${props => props.theme.input.input_border};
  display: flex;
  border: 1px solid ${props => props.theme.input.input_border};
  align-items: center;
  border-radius: 4px;
  -webkit-appearance: none;
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  width: 64px;
  background: ${props => props.theme.button.primary};
  color: white;
  margin-right: 16px;
  border-radius: 2px;
  font-size: 12px;

  text-transform: uppercase;
  transition: 500ms;
  font-family: Inter-Regular;

  &:hover {
    background: ${props => props.theme.button.primary_hover};
    cursor: pointer;
    transition: 500ms;
  }
`;

export const Field = styled.input`
  border: none;
  background: ${props => props.theme.input.input_background};
  border-radius: 4px 0px 0px 4px;
  width: 100%;
  padding: 16px;
  font-family: Inter-Regular;
  font-size: 16px;
  color: ${props => props.theme.input.input_value};
  line-height: 26px;
  outline: none;
  transition: 500ms;
  -webkit-appearance: none;

  &::placeholder {
    font-family: Inter-Regular;
    font-size: 16px;
    color: ${props => props.theme.input.input_placeholder};
    line-height: 26px;
  }
`;

export const Labels = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;
