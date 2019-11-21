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

export const Wrapper = styled.div`
  width: auto;
  background: pink;
  display: flex;
  background: ${props => props.theme.input.input_background};
  border: 1px solid ${props => props.theme.input.input_border};
  border-radius: 4px;
  align-items: center;
  word-wrap: break-word;
`;

export const Button = styled.div`
  background: #7289da;
  margin-right: 20px;
  margin-left: 20px;
  padding: 4px 12px;
  border-radius: 2px;
  font-size: 11px;
  color: #fff;
  font-family: Inter-Regular;
  text-transform: uppercase;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Field = styled.input`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-family: Inter-Regular;
  width: 100%;
  height: auto;

  font-size: 16px;
  color: ${props => props.theme.input.input_value};
  line-height: 26px;

  outline: none;
  transition: 500ms;
  border: none;
  border-radius: 4px;
  background: ${props => props.theme.input.input_background};
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
