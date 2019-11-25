
import React,{Component} from "react"
import {Assets} from "../../../../../universal/pages/_wallet/assets";
import { connect } from "react-redux";
import {selectReadableBalance} from "../../../../../universal/reducers/xBalance";

class AssetsDesktopContainer extends Component {

    render() {

        return (<Assets {...this.props}/>)
    }
}

export const mapStateToProps = state => ({
    readableBalance: Number(selectReadableBalance(state))
});

export const AssetsDesktop =  connect(
    mapStateToProps,
    { }
)(AssetsDesktopContainer);
