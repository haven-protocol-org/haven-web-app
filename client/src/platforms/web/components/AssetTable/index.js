// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports

import {
  Cards,
  Wrapper,
  GraphContainer,
  Column,
  ColumnData,
  Cell,
  Data,
  Title
} from "./styles";
import { xhvVsCurrenciesFetch } from "../../actions/xhvVsCurrencies";
import {
  Subtitle
} from "../../../../shared/pages/_public/welcome/styles";

import { AssetGraph } from "../AssetGraph/index.js";

class AssetTable extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  renderTokens = tickerList => {
    return tickerList.map(info => {
      const [token, data] = info;

      return (
        <Cards to={"/create"} ticker={token} key={token}>
          <Cell>
            <Column>
              <Title left="left">{data.token}</Title>
              <Subtitle left>
                {data.symbol + data.lastPrice.toFixed(2)}
              </Subtitle>
            </Column>
            <Data>
              <Column>
                <Title>{token === "XHV" ? token : "x" + token}</Title>
                <Subtitle right="right">
                  {data.change.toFixed(2) + "%"}
                </Subtitle>
              </Column>
              <ColumnData>
                <AssetGraph prices={data.prices} ticker={token} />
              </ColumnData>
            </Data>
          </Cell>
        </Cards>
      );
    });
  };

  render() {
    const tickerList = Object.entries(this.props.xhvVsCurrencies).filter(
      entry => {
        const key = entry[0];
        const data = entry[1];
        return data.prices.length > 0;
      }
    );

    return <>{this.renderTokens(tickerList)}</>;
  }
}

const mapStateToProps = state => ({
  xhvVsCurrencies: state.xhvVsCurrencies
});

export const AssetTableWeb = connect(
  mapStateToProps,
  { fetchCurrencies: xhvVsCurrenciesFetch }
)(AssetTable);
