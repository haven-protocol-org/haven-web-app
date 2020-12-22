import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  grid-column: ${(props) => (props.width ? "1 / 3" : null)};

  ${media.mobile`
    grid-column: 1 / 3;
  `};
`;

export const Wrapper = styled.div`
  width: auto;
  background: pink;
  display: flex;
  background: ${(props) => props.theme.input.input_background};
  border: 1px solid ${(props) => props.theme.input.input_border};
  border-radius: 4px;
  align-items: center;
  word-wrap: break-word;
`;

export const Button = styled.div`
  background: ${(props) => props.theme.button.primary};
  margin-right: 16px;
  margin-left: 16px;
  padding: 8px 12px;
  width: 64px;
  border-radius: 2px;
  font-size: 11px;
  color: #fff;
  font-family: Inter-Regular;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;

  &:hover {
    transition: 500ms;
    cursor: pointer;
    background: ${(props) => props.theme.button.primary_hover};
  }
`;

export const Field = styled.input`
  padding: 16px;
  font-family: Inter-Regular;
  width: 100%;
  height: auto;
  font-size: 16px;
  color: ${(props) => props.theme.input.input_value};
  line-height: 26px;
  outline: none;
  transition: 500ms;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.input.input_background};
  -webkit-appearance: none;

  &::placeholder {
    font-family: Inter-Regular;
    font-size: 16px;
    color: ${(props) => props.theme.input.input_placeholder};
    line-height: 26px;
  }

  ${media.mobile`
    width: 60%;
  `};
`;

export const Labels = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;
