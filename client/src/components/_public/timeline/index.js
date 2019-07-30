// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  Cell,
  Description,
  Title,
  Heading,
  Complete,
  Label,
  Data,
  Separator,
  Line,
  Circle,
  Icon,
  Progress,
  Soon
} from "./styles";
import tick from "../../../assets/icons/tick.svg";

const Content = () => {
  return (
    <>
      <Container>
        <Heading>Q3 2019</Heading>
        <Cell>
          <Complete>
            <Label>Complete</Label>
          </Complete>
          <Data>
            <Title complete>Relase Haven Vault</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle complete>
            <Icon src={tick} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Progress</Label>
          </Progress>
          <Data>
            <Title>Network Upgrade</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Progress</Label>
          </Progress>
          <Data>
            <Title>Haven 2.0 Whitepaper</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Progress</Label>
          </Progress>
          <Data>
            <Title>Offshore Infrastructure Deployment</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Heading>Q4 2019</Heading>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>Mobile Wallets iOS and Android</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>Ledger Hardware Wallet</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>Offshore Testnet</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Heading>Q1 2020</Heading>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>Offshore Mainnet</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>Additional Currencies</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Separator>
          <Line />
          <Circle>
            <Icon src={""} />
          </Circle>
          <Line />
        </Separator>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>xCDP Testnet</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
        <Heading>Q2 2020</Heading>
        <Cell>
          <Progress>
            <Label>Pending</Label>
          </Progress>
          <Data>
            <Title>xCDP Mainnet</Title>
            <Description>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint.
            </Description>
          </Data>
        </Cell>
      </Container>
    </>
  );
};

export default Content;
