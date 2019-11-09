
import React,{Component} from "react"
import {Assets} from "../../../../../pages/_wallet/assets";
import { connect } from "react-redux";
import {selectReadableBalance} from "../../../../../reducers/balance";

class AssetsWebContainer extends Component {

    render() {

        return (
            <Assets {this.props}/>
        )

    }



}

export const mapStateToProps = state => ({
    balance: state.balance,
    readableBalance: selectReadableBalance(state)
});

export const AssetsWeb =  connect(
    mapStateToProps,
    { }
)(AssetsWebContainer);
