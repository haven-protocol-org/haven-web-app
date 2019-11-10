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
import { isMainnet } from "../../env";
// import { isDevMode } from "../../constants/env";

export const Transaction = ({
  type,
  date,
  tx,
  amount,
  block,
  price,
  status,
  mempool,
  bHeight
}) => {
  const first = tx.substring(0, 4);
  const last = tx.substring(tx.length - 4);
  const truncated = first + "...." + last;
  const value = price * amount;

  let statusDetails = "Completed";

  if (status === "pending") {
    statusDetails = `~${(block + 10 - bHeight) * 2} min`;
  }

  if (mempool) {
    statusDetails = "Not confirmed yet";
  }

  const txExplorerLink = `https://explorer${
    isMainnet() ? "" : "-test"
  }.havenprotocol.org/tx/${tx}`;

  return (
    <Container href={txExplorerLink} target="_blank">
      <State status={type}>
        <Status>{type}</Status>
      </State>
      <Column>
        <Row>
          <Data>
            <Value alignment="left">{amount}</Value>
            <Label alignment="left">Amount</Label>
          </Data>
          {status === "pending" ? (
            <Data>
              <Value alignment="center">{statusDetails}</Value>
              <Label alignment="center">{status}</Label>
            </Data>
          ) : (
            <Data>
              <Value alignment="center">{statusDetails}</Value>
              <Label alignment="center">Status</Label>
            </Data>
          )}
          <Data>
            <Value alignment="right">${value.toFixed(2)}</Value>
            <Label alignment="right">Current Value</Label>
          </Data>
        </Row>
        <Row>
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
