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
  Data,
} from "./styles";
import { isMainnet } from "constants/env";

export interface TransactionProps {
  type: any;
  date: any;
  hash: string;
  amount: any;
  block: any;
  currentValueInUSD: any;
  mempool: boolean;
  timeTillUnlocked: any;
  fee: any;
}

export const Transaction = ({
  type,
  date,
  hash,
  amount,
  block,
  currentValueInUSD,
  mempool,
  timeTillUnlocked,
  fee,
}: TransactionProps) => {
  const first = hash.substring(0, 4);
  const last = hash.substring(hash.length - 4);
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
    statusLabel = "Unlocks in";
  }

  const txExplorerLink = `https://explorer${
    isMainnet() ? "" : "-testnet"
  }.havenprotocol.org/tx/${hash}`;

  console.log("FEE", fee);

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
              <Value alignment="left">{fee.toFixed(4)}</Value>
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
            <Label alignment="right">Receipt</Label>
          </Data>
        </Row>
      </Column>
    </Container>
  );
};
