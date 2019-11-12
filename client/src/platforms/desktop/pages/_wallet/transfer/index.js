import {connect} from "react-redux";
import {transfer, resetTransferProcess} from "../../../actions";
import {Transfer} from "../../../../../universal/pages/_wallet/transfer";
import React, {Component} from "react";
import {transferSucceed} from "../../../reducers/transferProcess";


class TransferDesktopContainer extends Component {


  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.transferSucceed) {

      resetTransferProcess();
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
  unlockedBalance: state.balance.unlockedBalance,
  transferSucceed:transferSucceed
});

export const TransferDesktop = connect(
    mapStateToProps,
    { transfer, resetTransferProcess }
)(TransferDesktopContainer);
