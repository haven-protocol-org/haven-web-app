// Library Imports
import React, { Component, Fragment } from "react";
import { OwnAddress } from "shared/pages/_wallet/transfer/receive";
import { Ticker } from "shared/reducers/types";
import Tab from "../../../components/tab";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import { SendFunds } from "./send";
import { AddressEntry } from "shared/reducers/address";

// Relative Imports

interface TransferOwnProps {
  sendFunds: (
    address: string,
    amount: number,
    ticker: Ticker,
    sweepAll: boolean
  ) => void;
  addresses: AddressEntry[];
  isProcessing: boolean;
}

interface TransferState {
  firstTabState: boolean;
  secondTabState: boolean;
}

type TransferProps = TransferOwnProps;

export class Transfer extends Component<TransferProps, TransferState> {
  state: TransferState = {
    firstTabState: true,
    secondTabState: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  toggleSend = () => {
    this.setState({
      firstTabState: true,
      secondTabState: false,
    });
  };

  toggleReceive = () => {
    this.setState({
      firstTabState: false,
      secondTabState: true,
    });
  };

  render() {
    return (
      <Fragment>
        <Body>
          <Header
            title="Transfer"
            description="Send or receive assets to and from your Haven Vault"
          />
          <Tab
            firstTabLabel="Send"
            secondTabLabel="Receive"
            firstTabState={this.state.firstTabState}
            secondTabState={this.state.secondTabState}
            firstTabClickEvent={this.toggleSend}
            secondTabClickEvent={this.toggleReceive}
            onClick={() => {}}
          />

          {this.state.firstTabState ? (
            <SendFunds
              sendFunds={this.props.sendFunds}
              isProcessing={this.props.isProcessing}
            />
          ) : (
            <OwnAddress />
          )}
        </Body>
      </Fragment>
    );
  }
}
