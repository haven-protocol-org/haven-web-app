import {Details} from "../../../../../universal/pages/_wallet/details";
import React, {Component} from "react";
import {TxHistoryDesktop} from "../../../components/TxHistory";
import {connect} from "react-redux";
import {DesktopAppState} from "../../../reducers";

class DetailsDesktopContainer extends Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return (

            <Details assetId={this.props.match.id} balance={this.props.balance}>
                <TxHistoryDesktop />
            </Details>

                );
    }
}


export const mapStateToProps = (state: DesktopAppState) => ({
    balance: Number(state.xBalance.XHV.unlockedBalance),
});

export const DetailsDesktop = connect(
    mapStateToProps,
    {  }
)(DetailsDesktopContainer);
