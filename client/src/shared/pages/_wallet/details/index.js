// Library Imports
import React, { Component } from "react";
// Relative Imports
import Body from "../../../components/_layout/body";
import { ChartContainer } from "../../../components/chart-container";
import PropTypes from "prop-types";

export class Details extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Body>
        <ChartContainer balance={this.props.balance} />

        {this.props.children}
      </Body>
    );
  }
}

Details.propTypes = {
  balance: PropTypes.any.isRequired
};
