import styled from "styled-components";
import media from "../../../../assets/styles/media.js";

export const Container = styled.div`
  background: ${props => props.theme.body.background};
  height: auto;
  overflow: auto;
  display: grid;
  grid-gap: 20px;
  margin-top: 60px;
  padding: 20px;
  height: calc(100vh - 58px);
  grid-template-columns: 1fr 1fr;
  align-content: flex-start;

  ${media.laptop`
    order: 1;
    grid-template-columns: 1fr;
    -webkit-overflow-scrolling: touch;
  `};
`;

export const Spacing = styled.div`
  height: 60px;
  grid-column: 1 / 3;

  ${media.mobile`
    height: 200px;
  `};
`;

/*
The grid template columns has a prop that lets you override the split view
with a full view from that parent. This lets us control the childen layout
from higher up the component tree.

The Padding is an explicit addition because the padding of the body wasn't
being listened to by the browser. If you delete it you'll see the cards end
up flush against the bottom of the view port and this creates issues. If
you can get the padding-bottom to work then this can be removed.
*/
