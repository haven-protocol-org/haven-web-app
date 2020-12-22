import styled from "styled-components";

export const Container = styled.div`
  height: auto;
  width: 100%;
  background: pink;
  border-radius: 4px;
  background: ${(props) => props.theme.body.foreground};
  border: 1px solid ${(props) => props.theme.body.border};
  margin-bottom: 12px;
`;

export const Header = styled.div`
  height: auto;
  padding: 16px 12px;
  border-bottom: 1px solid ${(props) => props.theme.body.border};
`;
export const Footer = styled.div`
  height: auto;
  padding: 16px 12px;
  border: 1px solid ${(props) => props.theme.body.border};
  background: ${(props) => props.theme.body.foreground};
  margin-top: 12px;
  border-radius: 4px;
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
  border-radius: 2px;
  border: 1px solid ${(props) =>
    props.priority === 1 ? props.theme.body.border : "none"}
  background: ${(props) => {
    switch (props.priority) {
      case 1:
        return `${props.theme.body.foreground}`;
      case 2:
        return `${props.theme.button.primary_hover}`;
      case 3:
        return `${props.theme.states.warning}`;
      case 4:
        return `${props.theme.states.error}`;
      default:
    }
  }};

`;
