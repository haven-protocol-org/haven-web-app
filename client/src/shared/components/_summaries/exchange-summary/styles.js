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
  border-bottom: 1px solid ${(props) => props.theme.input.input_border};
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  padding: 6px 12px;
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
  border: 1px solid ${(props) => props.theme.input.input_border};
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
  border: 1px solid ${(props) =>
    props.priority === 1 ? props.theme.body.border : "none"}
  background: ${(props) => {
    switch (props.priority) {
      case 1:
        return `${props.theme.body.background}`;
      case 2:
        return `${props.theme.button.primary_hover}`;
      case 3:
        return `${props.theme.states.warning}`;
      case 4:
        return `${props.theme.states.error}`;
      default:
    }
  }};
  border-radius: 2px;
`;
