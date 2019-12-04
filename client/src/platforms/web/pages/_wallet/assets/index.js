
import React,{Component} from "react"
import {Assets} from "../../../../../shared/pages/_wallet/assets";
import { connect } from "react-redux";
import {selectReadableBalance} from "../../../../../shared/reducers/xBalance";

class AssetsWebContainer extends Component {

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

export const AssetsWeb =  connect(
    mapStateToProps,
    { }
)(AssetsWebContainer);
