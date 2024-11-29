import styled from "styled-components";
import media from "assets/styles/media";



export const AssetContainer = styled.div`
  height: auto;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.input.input_border};
  border-bottom: none;
  background: ${(props) => props.theme.body.foreground};
  padding-bottom: 4px;
  border-bottom: 1px solid ${(props) => props.theme.input.input_border};
  width: 100%;
`;

export const AssetRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin: 12px;
`;

export const AssetKey = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.secondary};
`;

export const AssetValue = styled.div`
  font-family: Inter-Regular;
  font-size: 14px;
  color: ${(props) => props.theme.type.primary};
`;


export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-column: 1 / 3;
`;

export const Button = styled.button`
  background: ${(props) => props.theme.button.primary};
  border: none;
  width: auto;
  min-width: 128px;
  height: 48px;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  transition: 500ms;
  outline: none;
  font-size: 15px;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);

    &:hover {
      background: ${(props) => props.theme.button.primary_hover};
      cursor: not-allowed;
    }
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.button.primary_hover};
    transition: 500ms;
  }
`;