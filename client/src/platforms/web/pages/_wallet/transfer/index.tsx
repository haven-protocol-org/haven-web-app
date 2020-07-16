import { connect } from "react-redux";
import { sendFunds, resetTransferProcess } from "../../../actions";
import { Transfer } from "shared/pages/_wallet/transfer";
import React, { Component } from "react";
import { transferSucceed } from "../../../reducers/transferProcess";
import { history } from "utility/history";
import {WebAppState} from "platforms/web/reducers";



class TransferWebContainer extends Component<any, any> {


  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {


  if (this.props.transferSucceed) {
      this.props.resetTransferProcess();
      history.push("/wallet/assets/XHV");
    }
  }

  render() {
    return (
      <Transfer
          addresses={this.props.address}
        isProcessing={this.props.tx.isProcessing}
        sendFunds={this.props.sendFunds}
      />
    );
  }
}

export const mapStateToProps = (state: WebAppState) => ({
  address: state.address,
  tx: state.transferProcess,
  transferSucceed: transferSucceed(state)
});

export const TransferWeb = connect(mapStateToProps, {
  sendFunds,
  resetTransferProcess
})(TransferWebContainer);
