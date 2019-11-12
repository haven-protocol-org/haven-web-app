import {connect} from "react-redux";
import {sendFunds, resetTransferProcess} from "../../../actions";
import {Transfer} from "../../../../../universal/pages/_wallet/transfer";
import React, {Component} from "react";
import {transferSucceed} from "../../../reducers/transferProcess";


class TransferWebContainer extends Component {


  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.transferSucceed) {
      this.props.resetTransferProcess();
      history.push("/wallet/assets/XHV");
    }
  }


  render() {
    return (
        <Transfer tx={this.props.tx} unlockedBalance={this.props.unlockedBalance}
                  address={this.props.address} sendFunds={this.props.sendFunds}/>
    )
  }
}


export const mapStateToProps = state => ({
  address: state.address.main,
  tx: state.txProcess,
  unlockedBalance: state.balance.unlockedBalance,
  transferSucceed:transferSucceed(state)
});

export const TransferWeb = connect(
    mapStateToProps,
    { sendFunds, resetTransferProcess }
)(TransferWebContainer);
