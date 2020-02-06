import styled from "styled-components";

export const Container = styled.div`
  grid-column: 1 / 3;
  margin-top: -20px;
`;

export const Failed = styled.div`
  color: black;
  width: auto;
  font-size: 16px
  padding: 6px 12px;
  background: #F04747;
  border-radius:3px;
  text-align:center;
  grid-column: 1/-1;
`;

export const Footer = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.div`
  background: #7289da;
  border: none;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  text-decoration: none;

  transition: 500ms;

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;

export const Summary = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 8px;
`;

export const Row = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`;

export const Label = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #ffffff;
`;
export const Value = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: #8a8d90;
`;
