// Library Imports
import React, { useState } from "react";

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
  Button,
  Footer,
  Outline,
} from "./styles.js";
import icon from "../../../../assets/haven.svg";

const Mining = ({ status, mining }) => {
  const [go, startMining] = useState(false);
  return (
    <Container>
      <Header>
        <Brand>
          <Logo src={icon} />
        </Brand>
        <Column>
          <Status>{go === true ? "Mining" : "Not Mining"}</Status>
          <Hashes>{go === true ? "13 hps" : "0 hps"}</Hashes>
        </Column>
      </Header>
      {go === false ? (
        <Grid>
          <Image>
            <Inactive status></Inactive>
          </Image>
          <Image>
            <Inactive status></Inactive>
          </Image>
          <Image>
            <Inactive status></Inactive>
          </Image>
        </Grid>
      ) : (
        <Grid>
          <Image>
            <Active status></Active>
          </Image>
          <Image>
            <Active status></Active>
          </Image>
          <Image>
            <Active status></Active>
          </Image>
        </Grid>
      )}
      <Footer>
        <Outline onClick={() => startMining(false)}>Stop</Outline>
        <Button onClick={() => startMining(true)}>Start</Button>
      </Footer>
    </Container>
  );
};

export default Mining;
