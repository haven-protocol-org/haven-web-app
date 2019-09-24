// Library Imports
import React from "react";

// Relative Imports
import {
  Container,
  State,
  Status,
  Label,
  Value,
  Column,
  Row,
  Data
} from "./styles";

const Transaction = ({ type, date, tx, amount, block, price, status }) => {
  const first = tx.substring(0, 4);
  const last = tx.substring(tx.length - 4);
  const truncated = first + "...." + last;
  const value = price * amount;

  console.log("PROPS", type);

  return (
    <Container
      href={`https://explorer-test.havenprotocol.org/tx/${tx}`}
      target="_blank"
    >
      <State status={type}>
        <Status>{type}</Status>
      </State>

      <Column>
        <Row>
          <Data>
            <Value alignment="left">{amount}</Value>
            <Label alignment="left">Amount</Label>
          </Data>
          <Data>
            <Value alignment="center">{status}</Value>
            <Label alignment="center">Status</Label>
          </Data>
          <Data>
            <Value alignment="right">${value.toFixed(2)}</Value>
            <Label alignment="right">Current Value</Label>
          </Data>
        </Row>
        <Row margin>
          <Data>
            <Value alignment="left">{block}</Value>
            <Label alignment="left">Block</Label>
          </Data>
          <Data>
            <Value alignment="center">{date}</Value>
            <Label alignment="center">Date</Label>
          </Data>
          <Data>
            <Value alignment="right">{truncated}</Value>
            <Label alignment="right">Reciept</Label>
          </Data>
        </Row>
      </Column>
    </Container>
  );
};

export default Transaction;
