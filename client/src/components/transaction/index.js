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

const Transaction = ({ status, alignment, date, tx, amount }) => {
  const last = tx.substring(tx.length - 4);
  const first = tx.substring(0, 4);
  const truncated = first + "...." + last;

  return (
    <Container
      href={`https://explorer.havenprotocol.org/tx/${tx}`}
      target="_blank"
    >
      <State status={status}>
        <Status>{status === "in" ? "Received" : "Sent"}</Status>
      </State>

      <Column>
        <Row>
          <Data>
            <Value alignment="left">{amount}</Value>
            <Label alignment="left">Amount</Label>
          </Data>
          <Data>
            <Value alignment="center">{843.21}</Value>
            <Label alignment="center">Price</Label>
          </Data>
          <Data>
            <Value alignment="right">{123.32 * 843.21}</Value>
            <Label alignment="right">Value</Label>
          </Data>
        </Row>
        <Row margin>
          <Data>
            <Value alignment="left">Transfer</Value>
            <Label alignment="left">Type</Label>
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
