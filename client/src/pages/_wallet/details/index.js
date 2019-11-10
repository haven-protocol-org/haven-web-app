// Library Imports
import React, {Component} from "react";
// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import {ChartContainer} from "../../../components/chart-container";
import PropTypes from "prop-types";


export class Details extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {


    return (
      <Page>
        <Menu />
        <Body>

        <ChartContainer balance={this.props.balance}/>



        </Body>
      </Page>
    );
  }
}

Details.propTypes = {

  balance:PropTypes.any.isRequired

};
