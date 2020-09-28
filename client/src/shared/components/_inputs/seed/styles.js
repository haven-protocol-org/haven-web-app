import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Error = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #f04747;
  text-align: right;
`;

export const Paste = styled.button`
  height: auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin-top: -3px;
  border-radius: 4px;
  background: ${(props) => props.theme.input.input_background};
  border: 1px solid ${(props) => props.theme.input.input_border};
  color: ${(props) => props.theme.type.secondary};
  outline: none;
  transition: 500ms;

  &:hover {
    color: ${(props) => props.theme.type.primary};
    cursor: pointer;
    transition: 500ms;
    border: 1px solid #5c5f63;
  }

  ${media.mobile`
    display:  none;
    `}
`;

export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  grid-column: ${(props) => (props.width ? "1 / 3" : null)};
`;

export const Field = styled.textarea.attrs((props) => ({
  type: "password",
  rows: props.rows ? props.rows : "4",
}))`
  display: flex;
  align-items: flex-start;
  border: 1px solid #4a4d52;
  border-bottom: none;
  border-radius: 4px;
  padding: 16px;
  font-family: Inter-Regular;
  font-size: 16px;
  line-height: 26px;
  resize: none;
  outline: none;
  transition: 500ms;
  -webkit-appearance: none;
  background: ${(props) => props.theme.input.input_background};
  border: 1px solid ${(props) => props.theme.input.input_border};
  color: ${(props) => props.theme.input.input_value};

  &:focus {
    border: 1px solid #5c5f63;
    transition: 500ms;
  }

  &::placeholder {
    font-family: Inter-Regular;
    font-size: 16px;
    color: #8a8d90;
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
