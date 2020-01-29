// Library Imports
import React from "react";

// Relative Imports
import {
  Core,
  Contributors,
  Cell,
  Description,
  Title,
  Avatar,
  Heading,
  Wrapper,
  Container
} from "./styles";

// Core
import dweab from "../../../../assets/team/dweab.png";
import pierre from "../../../../assets/team/pierre.png";
import neac from "../../../../assets/team/neac.png";
import marty from "../../../../assets/team/marty.png";
// Contributors

import ahawk from "../../../../assets/team/ahawk.png";
import mad from "../../../../assets/team/mad.png";
import rare from "../../../../assets/team/rare.png";
import goshiz from "../../../../assets/team/goshiz.png";
import jriggs from "../../../../assets/team/jriggs.png";
import luge from "../../../../assets/team/luge.png";

const Content = () => {
  return (
    <Container>
      <Wrapper>
        <Heading>Core Team</Heading>
        <Core>
          <Cell>
            <Avatar src={dweab} />
            <Title>Dweab</Title>
            <Description>Project Lead</Description>
          </Cell>

          <Cell>
            <Avatar src={pierre} />
            <Title>Pierre Lafitte</Title>
            <Description>Product Lead</Description>
          </Cell>
          <Cell>
            <Avatar src={neac} />
            <Title>Neac</Title>
            <Description>Protocol Lead</Description>
          </Cell>
          <Cell>
            <Avatar src={marty} />
            <Title>Marty</Title>
            <Description>Frontend Lead</Description>
          </Cell>
        </Core>
      </Wrapper>
      <Wrapper>
        <Heading>Contributing Team</Heading>
        <Contributors>
          <Cell>
            <Avatar src={goshiz} />
            <Title>Goshiz</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src={ahawk} />
            <Title>AHawk</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src={jriggs} />
            <Title>Jriggs</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src={mad} />
            <Title>Madlentil</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src={luge} />
            <Title>Luge</Title>
            <Description>Community Manager</Description>
          </Cell>

          <Cell>
            <Avatar src={rare} />
            <Title>Rarecommons</Title>
            <Description>Community Manager</Description>
          </Cell>
        </Contributors>
      </Wrapper>
    </Container>
  );
};

export default Content;
