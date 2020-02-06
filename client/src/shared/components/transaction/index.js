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
import { isMainnet } from "../../../constants/env";
// import { isDevMode } from "../../constants/env";

export const Transaction = ({
  type,
  date,
  tx,
  amount,
  block,
  currentValueInUSD,
  status,
  mempool,
  timeTillUnlocked,
  fee = 0
}) => {
  const first = tx.substring(0, 4);
  const last = tx.substring(tx.length - 4);
  const truncated = first + "...." + last;
  const inUsd = isNaN(parseFloat(currentValueInUSD))
    ? 0
    : parseFloat(currentValueInUSD);

  let statusDetails = "Completed";
  let statusLabel = "Status";

  if (mempool) {
    statusDetails = "Not confirmed yet";
  } else if (timeTillUnlocked) {
    statusDetails = "~ " + timeTillUnlocked;
    statusLabel = "Unlocked in";
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

          <Data>
            <Value alignment="center">{statusDetails}</Value>
            <Label alignment="center">{statusLabel}</Label>
          </Data>

          <Data>
            <Value alignment="right">${inUsd.toFixed(2)}</Value>
            <Label alignment="right">Current Value</Label>
          </Data>
        </Row>
        <Row>
          {fee !== 0 ? (
            <Data>
              <Value alignment="left">{fee}</Value>
              <Label alignment="left">Fee</Label>
            </Data>
          ) : (
            <Data>
              <Value alignment="left">{block}</Value>
              <Label alignment="left">Block</Label>
            </Data>
          )}

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
