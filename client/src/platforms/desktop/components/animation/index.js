// Library Imports
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

import {
  Active,
  Inactive,
  Container,
  Grid,
  Image,
  Header,
  Brand,
  Logo,
  Status,
  Column,
  Hashes,
  Footer,
  Indicator,
  Row,
  Gpu,
  RemoteNode,
} from "./styles.js";
import icon from "../../../../assets/haven.svg";
import light from "../../../../assets/haven-dark.svg";
import { Information } from "../../../../assets/styles/type.js";

const Mining = ({ status, mining, hash, children, isLocalNode }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <Header>
        <Brand>
          <Logo src={themeContext.value === "Dark Theme" ? icon : light} />
          <Gpu>GPU Miner</Gpu>
        </Brand>

        <Column>
          <Row>
            <Indicator mining={mining} />
            <Status>{mining}</Status>
          </Row>
          <Hashes>{hash}</Hashes>
        </Column>
      </Header>
      {mining === "Not Mining" ? (
        <Grid>
          <Image>
            <Inactive status="true" />
          </Image>
          <Image hide="true">
            <Inactive status="true" />
          </Image>
        </Grid>
      ) : (
        <Grid>
          <Image>
            <Active status="true" />
          </Image>
          <Image hide="true">
            <Active status="true" />
          </Image>
        </Grid>
      )}
      {!isLocalNode && (
        <RemoteNode>
          <Information>
            It appears that you are currently connected to a{" "}
            <strong>Remote Node</strong>. To start mining please connect and
            sync a <strong>Local Node</strong>.
          </Information>
        </RemoteNode>
      )}
      <Footer>{children}</Footer>
    </Container>
  );
};

export default Mining;
