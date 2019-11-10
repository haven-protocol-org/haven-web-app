import {Details} from "../../../../../pages/_wallet/details";
import React, {Component} from "react";
import {TxHistoryWeb} from "../../../components/TxHistory";
import {connect} from "react-redux";

class DetailsWebContainer extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return (

            <Details assetId={this.props.match.id} balance={this.props.balance}>
                <TxHistoryWeb />
            </Details>

                );
    }
}


export const mapStateToProps = state => ({
    balance: state.balance.unlockedBalance,
});

export const DetailsWeb = connect(
    mapStateToProps,
    {  }
)(DetailsWebContainer);
