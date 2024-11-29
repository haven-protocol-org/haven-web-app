// Library Imports
import React, { Fragment } from "react";
import { Ticker } from "shared/reducers/types.ts";
// Relative Imports
import {
  Container,
  Row,
  Key,
  Value,
  Tag,
  SubHeader,
  Information,
  Url,
  Strong,
} from "./styles";
import Confirm from "../../confirm/index.js";
import Cell from "../cells/index.js";

//TOKENOMICS below - priority needs updating
const Transaction = ({
  xRate,
  fromAmount,
  toAmount,
  fromTicker,
  toTicker,
  fee,
  externAddress,
  onChange,
  checked,
  priority,
  isOwnAddress,
  xasset_conversion,
  change,
  collateral,
  slippage
}) => {
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  let unlock_time = "--";
  let collateral_unlock_time;
  if(fromTicker !== null && toTicker != null){
    if( fromTicker === Ticker.XHV && toTicker === Ticker.xUSD){
      unlock_time = "24 hour";
      collateral_unlock_time = "24 hour";
    }else if( fromTicker === Ticker.xUSD && toTicker === Ticker.XHV ){
      unlock_time = "24 hour";
      collateral_unlock_time = "24 hour";
    }else{
      unlock_time = "48 hour"
    }
  }

  // Adding for simplicity and clarity
  const from = `${fromAmount} ${fromTicker}`;
  const to = `${toAmount} ${toTicker}`;

//TOKENOMICS below - text / formating and markup needs updating
  return (
    <Fragment>
      <Container>
        <SubHeader>Conversion Details</SubHeader>
        <Cell left="Convert From" right={from} />
        <Cell left="Convert To" right={to} />
        {!isOwnAddress && (
          <Cell left="Recipient Address" right={truncatedAddress} />
        )}
        {collateral > 0 && (<Cell left="Collateral" right={collateral + ' XHV'} />
        )}
        <Cell left="Converted Amount Unlock Time" right={unlock_time + "s"}/>
        {collateral_unlock_time && (<Cell left="Collateral Unlock Time" right={collateral_unlock_time + "s"} />)}
        <Row>
          <Key>Slippage</Key>
          <Tag priority={3}>
            <Value>
              {slippage} {fromTicker}
            </Value>
          </Tag>
        </Row>
        </Container>
        <Container>
      <SubHeader>Transaction Details</SubHeader>
      <Cell left={`Change (${fromTicker})`} right={change} />
      <Cell left="Unlock Time" right="~20m" />
      <Row>
          <Key>Final Conversion Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee} XHV
            </Value>
          </Tag>
        </Row>
        <Confirm
          description={<span>I accept the slippage, {collateral_unlock_time ? collateral_unlock_time : unlock_time} conversion unlock time, details,&nbsp;<Url
                target="_blank"
                href="https://havenprotocol.org/knowledge/converting-assets/">terms</Url> & fees.</span>}
          checked={checked}
          onChange={onChange}
        />
   
      </Container>

    </Fragment>
  );
};

export default Transaction;
