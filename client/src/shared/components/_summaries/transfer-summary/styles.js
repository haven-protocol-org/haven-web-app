import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.input.input_border};
  border-bottom: none;
  margin-top: 20px;
  background: ${(props) => props.theme.body.foreground};
  padding-bottom: 4px;
  border-bottom: 1px solid ${(props) => props.theme.input.input_border};
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
  color: ${(props) => props.theme.type.primary};
`;

export const FeePadding = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FeeRow = styled.div`
  width: 100%;
  background: ${(props) => props.theme.body.foreground};
  border-top: 1px solid ${(props) => props.theme.input.input_border};
  border-bottom: 1px solid ${(props) => props.theme.input.input_border};
  border-radius: 0px 0px 4px 4px;
`;

export const Tag = styled.div`
  width: auto;
  height: 22px;
  font-size: 10px;
  color: ${(props) => props.theme.type.primary};
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid ${(props) => props.theme.body.border};
  background: ${(props) => props.theme.body.background}
  border-radius: 2px;
`;
