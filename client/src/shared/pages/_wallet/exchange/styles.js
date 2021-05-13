import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  display: grid;
  grid-column: ${(props) => (props.gridColumn ? "1 / 3" : null)};
`;

export const WideContainer = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1fr;
  grid-column: 1 / 3;
  grid-row-gap: 16px;
  margin-top: -16px;
`;
