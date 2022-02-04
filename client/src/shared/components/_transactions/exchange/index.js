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
}) => {
  const first = externAddress.substring(0, 4);
  const last = externAddress.substring(externAddress.length - 4);
  const truncatedAddress = first + "...." + last;

  let unlock_time = "--";
  if(fromTicker !== null && toTicker != null){
    if( fromTicker === Ticker.XHV && toTicker === Ticker.xUSD){
      unlock_time = "~21d";
    }else if( fromTicker === Ticker.xUSD && toTicker === Ticker.XHV ){
      unlock_time = "~12h";
    }else{
      unlock_time = "~48h"
    }
  }

  // Adding for simplicity and clarity
  const from = `${fromAmount} ${fromTicker}`;
  const to = `${toAmount} ${toTicker}`;

//TOKENOMICS below - text / formating and markup needs updating
  return (
    <Fragment>
      <Container>
        <Cell left="Convert From" right={from} />
        <Cell left="Convert To" right={to} />
        {!isOwnAddress && (
          <Cell left="Recipient Address" right={truncatedAddress} />
        )}
        <Cell left="Unlock Time" right={unlock_time} />

        <Row>
          <Key>Final Conversion Fee</Key>
          <Tag priority={priority}>
            <Value>
              {fee} {fromTicker}
            </Value>
          </Tag>
        </Row>
        <Confirm
          description={`I accept the ${unlock_time} Unlock Time, Details, Terms & Fees`}
          checked={checked}
          onChange={onChange}
        />
      </Container>
      <Information>
        {change > 0 ? (
          <>
            <strong style={{ textDecoration: 'underline'}}>ALERT</strong>: Approximately{" "}
            <strong style={{ fontWeight: 600 }}> {change} {fromTicker} will be temporarily locked and unusable for ~20m</strong>. 
            To understand why this happens and how it might impact your experience, please{" "}
            <strong>
              <Url
                target="_blank"
                href="https://havenprotocol.org/knowledge/haven-transactions/"
              >
                click here.
              </Url>
            </strong>
          </>
        ) : (
          <>
            Details: This {fromTicker} transaction will be unlocked in {unlock_time}. I have reviewed my
            transaction details and accept all responsibility for this transaction.
          </>
        )}
      </Information>
    </Fragment>
  );
};

export default Transaction;
