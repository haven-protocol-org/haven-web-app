import {connect} from "react-redux";
import {sendFunds} from "../../../../../actions";
import {Component} from "react";
import {Transfer} from "../../../../../pages/_wallet/transfer";
import React, {Component} from "react";


class TransferWebContainer extends Component {


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
  unlockedBalance: state.balance.unlockedBalance
});

export const TransferWeb = connect(
    mapStateToProps,
    { sendFunds }
)(TransferWebContainer);
