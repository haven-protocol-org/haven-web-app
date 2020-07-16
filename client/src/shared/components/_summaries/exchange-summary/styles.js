import styled from "styled-components";

export const Wrapper = styled.div`
  height: auto;
  margin-top: 20px;
`;

export const Container = styled.div`
  height: auto;
  width: 100%;
  border-radius: 4px;
  margin-top: 4px;
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.input.input_border};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: 12px;
`;

export const Key = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
`;

export const Value = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => (props) => props.theme.type.primary};
`;
