import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Overview = styled.div`
  height: 240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.body.border};

  margin-top: 68px;

  ${media.laptop`
    display: none;
  `};
`;

export const Wrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select:none;
`;

export const Value = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${props => props.theme.type.secondary};
  font-family: Inter-Regular;
  margin-top: 12px;
`;

export const Pending = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${props => props.theme.type.secondary};
  font-family: Inter-Regular;
  margin-top: 12px;
  text-align: center;
  line-height: 1.7em;
`;

export const Amount = styled.div`
  font-size: 32px;
  font-family: Inter-Bold;
  color: ${props =>
    props.isSyncing ? props.theme.type.secondary : props.theme.type.primary};
  letter-spacing: 0;
  line-height: 30px;
`;
