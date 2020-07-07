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
} from "./styles.js";
import icon from "../../../../assets/haven.svg";
import light from "../../../../assets/haven-dark.svg";

const Mining = ({ status, mining, hash, children }) => {
  const themeContext = useContext(ThemeContext);
  console.log("############################");
  console.log("Current theme: ", themeContext.value);
  return (
    <Container>
      <Header>
        <Brand>
          <Logo src={themeContext.value === "Dark Theme" ? icon : light} />
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
          <Image hide="true">
            <Inactive status />
          </Image>
          <Image hide="true">
            <Inactive status />
          </Image>
        </Grid>
      ) : (
        <Grid>
          <Image>
            <Active status />
          </Image>
          <Image hide="true">
            <Active status />
          </Image>
          <Image hide="true">
            <Active status />
          </Image>
        </Grid>
      )}
      <Footer>{children}</Footer>
    </Container>
  );
};

export default Mining;
