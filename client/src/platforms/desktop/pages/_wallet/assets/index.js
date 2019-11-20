
import React,{Component} from "react"
import {Assets} from "../../../../../universal/pages/_wallet/assets";
import { connect } from "react-redux";
import {selectReadableBalance} from "../../../../../universal/reducers/balance";

class AssetsDesktopContainer extends Component {

    render() {

        return (
            <Assets {...this.props}/>
        )
    }


}

export const mapStateToProps = state => ({
    balance: state.balance,
    readableBalance: selectReadableBalance(state)
});

export const AssetsDesktop =  connect(
    mapStateToProps,
    { }
)(AssetsDesktopContainer);
