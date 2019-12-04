import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.form`
  height: auto;
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${media.tablet`
    grid-template-columns: 1fr;

  `};
`;

/*
The container acts as a wrapper to the form inputs in the body component.
It's given a 1/3 override that makes it span the entire body width
We also give it an internal grid so we can space the inputs
At tablet breakpoints we give the inputs 100% form container width

*/
