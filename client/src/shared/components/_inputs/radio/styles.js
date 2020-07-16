import styled from "styled-components";

export const Container = styled.label`
  display: flex;
  height: 32px;
  align-items: center;
  margin-top: -4px;
`;

export const Wrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const Tick = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const Hidden = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:hover {
    cursor: pointer;
  }
`;

export const Displayed = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
  box-shadow: 0 0 0 3px ${(props) => props.theme.button.primary};
  background: ${(props) =>
    props.checked ? props.theme.button.primary : props.theme.body.background};

  &:hover {
    cursor: pointer;
  }

  ${Hidden}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.theme.button.primary};
  }

  ${Tick} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
