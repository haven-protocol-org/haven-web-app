import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled.button`
  background: #7289da;
  border: none;
  width: 120px;
  height: 48px;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  transition: 500ms;
  outline: none;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: #677bc4;
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
    background: #5b6eae;
    transition: 500ms;
  }
`;
