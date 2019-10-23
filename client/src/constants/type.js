import styled from "styled-components";

export const Title = styled.div`
  font-family: Inter-SemiBold;
  font-size: 20px;
  color: ${props => props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;

export const Description = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${props => props.theme.type.secondary};
  line-height: 24px;
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${props => props.theme.type.secondary};
`;

export const Error = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${props => props.theme.input.input_error};
  text-align: right;
`;

export const Information = styled.div`
  font-family: Inter-Regular;
  font-size: 13px;
  line-height: 22px;
  color: ${props => props.theme.type.secondary};
`;

export const Header = styled.div`
  font-weight: 900;
  font-family: "Playfair Display", serif;
  font-size: 68px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 80px;
  margin-bottom: 40px;
`;
