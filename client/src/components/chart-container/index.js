// Library Imports
import React, {Component} from "react";
// Relative Imports
import Chart from "../chart";
import PropTypes from "prop-types";
import Header from "../_layout/header";
import {Row} from "./styles";
import {connect} from "react-redux";
import {NO_PRICE, PRICE_RANGE_MONTH} from "../../reducers/priceHistory";
import {NO_BALANCE} from "../../reducers/balance";
import {getPriceDates, getPriceValues} from "../../utility";
import {selectSimplePrice} from "../../reducers/simplePrice";
import {getPriceHistory} from "../../actions";
import Statistic from "../statistic";
import {withRouter} from "react-router-dom";

class ChartWrapper extends Component {
    state = { selectedRangeInDays: PRICE_RANGE_MONTH };

    componentDidMount() {
        this.selectPriceHistory(PRICE_RANGE_MONTH);
    }

    selectPriceHistory(rangeInDays) {
        this.props.getPriceHistory(rangeInDays);
        this.setState({ selectedRangeInDays: rangeInDays });
    }

    getBalancePriceStats() {
        let amount = this.props.balance === NO_BALANCE ? 1 : this.props.balance;
        let price = this.props.lastPrice === NO_PRICE ? 1 : this.props.lastPrice;
        let value = price * amount;

        return { amount, price, value };
    }

    render() {

        const { id } = this.props.match.params;
        const { amount, price, value } = this.getBalancePriceStats();

        const priceRangeEntry = this.props.priceHistory.prices.find(
            priceRangeEntry =>
                priceRangeEntry.rangeInDays === this.state.selectedRangeInDays
        );

        const prices = getPriceValues(priceRangeEntry.prices);
        const labels = getPriceDates(priceRangeEntry.prices);

        return (
            <>
                <Header
                    back
                    title={`${id} Overview`}
                    description="Pricing history and asset values"
                />
                <Chart
                    prices={prices}
                    labels={labels}
                    price={price.toFixed(4)}
                    onChangePriceRange={args => this.selectPriceHistory(args)}
                />
                <Row>
                    <Statistic label="Amount" value={amount} />
                    <Statistic label="Price" value={`$` + price.toFixed(4)} />
                    <Statistic
                        label="Value"
                        value={value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}
                    />
                </Row>
                </>
    );
    }
}

const mapStateToProps = state => ({
    priceHistory: state.priceHistory,
    lastPrice: selectSimplePrice(state),

});

export const ChartContainer = withRouter(connect(
    mapStateToProps,
    { getPriceHistory }
)(ChartWrapper));



ChartWrapper.propTypes = {

    balance:PropTypes.any.isRequired,
    lastPrice:PropTypes.number.isRequired,
    priceHistory:PropTypes.any.isRequired,

};

