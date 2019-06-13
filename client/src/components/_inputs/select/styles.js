import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
`;

export const Field = styled.select`
  background: #2b2e32;
  border: 1px solid #4a4d52;
  border-radius: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  font-family: Inter-Regular;
  font-size: 16px;
  color: #ffffff;
  line-height: 26px;
  height: 56px;

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

export const Options = styled.div`
  height: 100px;
  width: auto;
  background: pink;
  z-index: 1000;
`;
