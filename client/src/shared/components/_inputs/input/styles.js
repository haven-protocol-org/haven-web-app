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

export const Field = styled.input`
  background: ${props => props.theme.input.input_background};
  border: 1px solid ${props => props.theme.input.input_border};
  border-radius: 4px;
  padding: 16px;
  font-family: Inter-Regular;
  font-size: 16px;
  color: ${props => props.theme.input.input_value};
  line-height: 26px;
  outline: none;
  width: auto;

  transition: 500ms;
  -webkit-appearance: none;

  &:focus {
    border: 1px solid ${props => props.theme.input.input_border_focus};
    transition: 500ms;
  }

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
