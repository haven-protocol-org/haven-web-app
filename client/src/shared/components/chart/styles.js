import styled from "styled-components";

export const Container = styled.div`
  grid-column: 1 / 3;
  height: 180px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 4px 4px;
  padding-top: 4px;
  padding-bottom: -4px;
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
  border-top: none;
`;

export const PriceHistory = styled.div`
  background: ${props => props.theme.body.foreground};
  height: 80px;
  width: auto;
  display: flex;
  flex-direction: column;
  grid-column: 1 / 3;
  margin-bottom: -20px;
  box-shadow: inset -1px 0 0 0 ${props => props.theme.body.border},
    inset 1px 0 0 0 ${props => props.theme.body.border};
`;

export const Value = styled.div`
  font-size: 36px;
  color: ${props => props.theme.type.primary};
  font-family: "Inter-Bold";
  text-align: center;
  margin-top: 12px;
`;

export const Label = styled.div`
  font-size: 16px;
  color: ${props => props.theme.type.secondary};
  text-align: center;
`;

export const Title = styled.div`
  font-size: 16px;
  font-family: "Inter-SemiBold";
  color: ${props => props.theme.type.primary};
`;

export const Placeholder = styled.div`
  grid-column: 1 / 3;
  max-height: 584px;
  height: 260px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 4px 4px;
  padding-top: 4px;
  padding-bottom: -4px;
  background: ${props => props.theme.body.foreground};
  border: 1px solid ${props => props.theme.body.border};
  border-top: none;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  font-size: 16px;
  font-family: Inter-Regular;
  color: ${props => props.theme.type.secondary};
  margin-top: 12px;
`;

export const Spacer = styled.div`
  height: 20px;
  grid-column: 1 / 3;
  min-height: 20px;
  width: 100%;
  font-family: Inter-SemiBold;
`;

export const Header = styled.div`
  height: auto;
  grid-column: 1/ 3;
  border-radius: 4px 4px 0px 0px;
  margin-bottom: -20px;
  background: ${props => props.theme.body.foreground};
  border-bottom: 1px solid ${props => props.theme.body.border};
  padding: 16px;
  font-size: 16px;
  font-family: Inter-SemiBold;
  color: ${props => props.theme.type.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.body.border};
`;

export const Button = styled.div`
  height: 30px;
  width: auto;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-left: 1px solid ${props => props.theme.body.border};
  font-family: "Inter-Regular";
  color: ${props => (props.active ? "#fff" : props.theme.type.secondary)};
  background: ${props =>
    props.active ? props.theme.button.primary : props.theme.body.foreground};
  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.button.primary_hover};
    color: white;
    transition: 500ms;
  }
`;

export const Buttons = styled.div`
  height: auto;
  display: flex;
  width: auto;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.body.border};
  border-left: none;
`;
