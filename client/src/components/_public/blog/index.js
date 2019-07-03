// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Avatar,
  Section,
  Heading,
  Wrapper
} from "./styles";

const Content = () => {
  return (
    <Wrapper>
      <Container>
        <Cell>
          <Title>Haven Added to ZelCore Ecosystem</Title>
          <Description>
            The Haven team is proud to announce we have been selected by Zel
            Technologies to be added to the ZelCore ecosystem.
          </Description>
        </Cell>
        <Cell>
          <Title>Haven Protocol — April 2019 Update</Title>
          <Description>
            Since January, the Haven Protocol project has undergone many
            organizational changes. We have grown considerably and are excited
            to share our progress with the community.
          </Description>
        </Cell>
        <Cell>
          <Title>
            Update from the Haven Protocol [XHV] Development team — Jan 2019
          </Title>
          <Description>
            As many of you have noticed, the Haven Protocol team has expanded
            over recent days.
          </Description>
        </Cell>
      </Container>
    </Wrapper>
  );
};

export default Content;
