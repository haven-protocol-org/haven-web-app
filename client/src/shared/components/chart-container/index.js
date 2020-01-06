// Library Imports
import React, {Component} from "react";
// Relative Imports
import Chart from "../chart";
import PropTypes from "prop-types";
import Header from "../_layout/header";
import {Row} from "./styles";
import {connect} from "react-redux";
import {PRICE_RANGE_MONTH} from "../../reducers/priceHistory";
import {getPriceDates, getPriceValues} from "../../../utility/utility";
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



    render() {

        const { id } = this.props.match.params;
        const { amount, price, value } = this.props;

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

});

export const ChartContainer = withRouter(connect(
    mapStateToProps,
    { getPriceHistory }
)(ChartWrapper));



ChartWrapper.propTypes = {

    amount:PropTypes.any.isRequired,
    value:PropTypes.any.isRequired,
    price:PropTypes.number.isRequired,
    priceHistory:PropTypes.any.isRequired,

};

