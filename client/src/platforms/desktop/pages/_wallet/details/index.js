import {Details} from "../../../../../pages/_wallet/details";
import React, {Component} from "react";
import {TxHistoryDesktop} from "../../../components/TxHistory";
import {connect} from "react-redux";

class DetailsWebContainer extends Component {

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


export const mapStateToProps = state => ({
    balance: state.balance.unlockedBalance,
});

export const DetailsDesktop = connect(
    mapStateToProps,
    {  }
)(DetailsWebContainer);
