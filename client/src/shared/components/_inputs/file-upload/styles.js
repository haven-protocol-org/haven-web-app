import styled from "styled-components";

export const Container = styled.div`
  background: #2b2e34;
  height: 120px;
  width: auto;
  border: 1px solid #4a4d52;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Upload = styled.input`
  width: auto;
  height: auto;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const Button = styled.input`
  font-size: 12px;
  display: none;
  background: pink;
`;

export const Label = styled.label`
  color: #8a8d90;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 90 %;
  font-size: 14px;
`;
