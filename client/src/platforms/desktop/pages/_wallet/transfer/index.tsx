import { HavenAppState } from "platforms/desktop/reducers";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Transfer } from "shared/pages/_wallet/transfer";
import { Ticker } from "shared/reducers/types";
import { resetTransferProcess } from "../../../actions";
import { transferSucceed } from "../../../../../shared/reducers/transferProcess";
import { createTransfer } from "shared/actions/transfer";
import { selectPrimaryAddress } from "shared/reducers/address";

class Container extends Component<any, any> {

  private sendTicker: Ticker = Ticker.XHV;
  componentDidMount(): void {
 
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    if (this.props.transferSucceed) {
      console.log("ROUTE", this.props.tx.fromTicker);

      this.props.resetTransferProcess();
      this.props.history.push("/wallet/assets/" + this.sendTicker);
    }
  }

  onSendFunds = (
    address: string,
    amount: number,
    paymentId: string,
    ticker: Ticker = Ticker.XHV
  ) => {
    this.sendTicker = ticker;
    this.props.createTransfer(address, amount, paymentId, ticker);
  };

  render() {
    return (
      //@ts-ignore
      <Transfer
        isProcessing={this.props.tx.isFetching}
        addresses={this.props.address}
        sendFunds={this.onSendFunds}
      />
    );
  }
}

export const mapStateToProps = (state: HavenAppState) => ({
  address: selectPrimaryAddress(state.address),
  transferSucceed: transferSucceed(state),
  tx: state.transferProcess,
});

export const HavenTransfer = connect(mapStateToProps, {
  createTransfer,
  resetTransferProcess
})(Container);
