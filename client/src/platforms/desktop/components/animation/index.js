// Library Imports
import React from "react";

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
} from "./styles.js";
import icon from "../../../../assets/haven.svg";

const Mining = ({ status, mining, hash, children }) => {
  return (
    <Container>
      <Header>
        <Brand>
          <Logo src={icon} />
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
            <Inactive status />
          </Image>
          <Image>
            <Inactive status />
          </Image>
          <Image>
            <Inactive status />
          </Image>
        </Grid>
      ) : (
        <Grid>
          <Image>
            <Active status />
          </Image>
          <Image>
            <Active status />
          </Image>
          <Image>
            <Active status />
          </Image>
        </Grid>
      )}
      <Footer>{children}</Footer>
    </Container>
  );
};

export default Mining;
