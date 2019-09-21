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

const Transaction = ({
  type,
  date,
  tx,
  amount,
  block,
  price,
    unlocked,
    unconfirmed
}) => {
  const first = tx.substring(0, 4);
  const last = tx.substring(tx.length - 4);
  const truncated = first + "...." + last;
  const value = price * amount;



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
            <Value alignment="center">NO_VALUE</Value>
            <Label alignment="center">Fee</Label>
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


//amount: "-500000778800000"
// approx_float_amount: -500.0007788
// coinbase: false
// hash: "d6b16e33f4b2bf8d1714aa58098c18520ce7ed4a270ba6ffd2189eb29b35832e"
// height: 46658
// id: 47063
// mempool: false
// mixin: 11
// spent_outputs: Array(2)
// 0: {amount: "1000000000000000", key_image: "c68fa7434e3573748dc42ad2fa30b13551f7e04d6c9b65c84161cc0e56d4b37c", mixin: 11, out_index: 1, tx_pub_key: "83bf579af1b840652cbd5f5c019a452b550ba2539eb1e9215e736c920a151c02"}
// 1: {amount: "28160864833614", key_image: "a5759fc2f064a4c08a8d8cf3df76e23210c5f5a1cb491232cd4228332c2f7c7f", mixin: 11, out_index: 0, tx_pub_key: "b40f81b6643f146acc0c88c3fca521ca5988042c42ced1c8e12068947027a875"}
// length: 2
// __proto__: Array(0)
// timestamp: 1565599217000
// total_received: "528160086033614"
// total_sent: "1028160864833614"
// tx_pub_key: "317f902ecb4c429f50aca688fa085e0b59ff67f15590d92000c7cda4634a3cc0"
// unlock_time: 46668
