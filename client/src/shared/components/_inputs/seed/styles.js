import styled from "styled-components";

export const Error = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.input.input_error};
  text-align: right;
`;

export const Container = styled.div`
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
  border: 1px solid ${(props) => props.theme.input.input_border};
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
    border: 1px solid ${(props) => props.theme.input.input_border_focus};
    transition: 500ms;
  }

  &::placeholder {
    font-family: Inter-Regular;
    font-size: 16px;
    color: ${(props) => props.theme.type.secondary};
    line-height: 26px;
  }
`;

export const Labels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;
