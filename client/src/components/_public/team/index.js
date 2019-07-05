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
  Section,
  Heading,
  Wrapper
} from "./styles";

// Core
import dweab from "../../../assets/team/dweab.png";
import pierre from "../../../assets/team/pierre.png";
import baki from "../../../assets/team/baki.png";
import neac from "../../../assets/team/neac.png";
// Contributors
import news from "../../../assets/team/news.png";
import ahawk from "../../../assets/team/ahawk.png";
import mad from "../../../assets/team/mad.png";
import rare from "../../../assets/team/rare.png";
// import goshiz from "../../../assets/team/goshiz.png";
// import marty from "../../../assets/team/marty.png";
// import luge from "../../../assets/team/luge.png";
// import nick from "../../../assets/team/nick.png";

const Content = () => {
  return (
    <>
      <Wrapper>
        <Heading>Core Team</Heading>
        <Core>
          <Cell>
            <Avatar src={dweab} />
            <Title>Dweab</Title>
            <Description>Project Leader</Description>
          </Cell>
          <Cell>
            <Avatar src={baki} />
            <Title>Nbourbaki</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src={pierre} />
            <Title>Pierre Lafitte</Title>
            <Description>Lead Product Designer</Description>
          </Cell>
          <Cell>
            <Avatar src={neac} />
            <Title>Neac</Title>
            <Description>Core Developer</Description>
          </Cell>
        </Core>
      </Wrapper>
      <Wrapper>
        <Heading>Contributing Team</Heading>
        <Contributors>
          <Cell>
            <Avatar src={news} />
            <Title>Newscutter</Title>
            <Description>Growth & Marketing</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Marty</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Goshiz</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Serpentchain</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Radvd</Title>
            <Description>Core Developer</Description>
          </Cell>
          <Cell>
            <Avatar src={ahawk} />
            <Title>AHawk</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Jriggs</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src={ahawk} />
            <Title>Madlentil</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>Luge</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif" />
            <Title>NickM4</Title>
            <Description>Community Manager</Description>
          </Cell>
          <Cell>
            <Avatar src={rare} />
            <Title>Rarecommons</Title>
            <Description>Community Manager</Description>
          </Cell>
        </Contributors>
      </Wrapper>
    </>
  );
};

export default Content;
