// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports

import {
  Cards,
  Column,
  ColumnData,
  Cell,
  Data,
  Title,
  Table,
  TableFooter,
  TableHeader
} from "./styles";
import { xhvVsCurrenciesFetch } from "../../actions/xhvVsCurrencies";
import { Subtitle } from "../../../../shared/pages/_public/welcome/styles";

import { AssetGraph } from "../AssetGraph/index.js";

class AssetTable extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  renderTokens = tickerList => {
    return tickerList.slice(0, 6).map(info => {
      const [token, data] = info;

      return (
        <Cards to={"/create"} ticker={token} key={token}>
          <Cell>
            <Column>
              <Title left="left">{data.token}</Title>
              <Subtitle left>
                {data.symbol + data.lastPrice.toFixed(4)}
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
        const data = entry[1];
        return data.prices.length > 0;
      }
    ).sort( (currencyA, currencyB) => currencyA[0] === 'XHV' ? -1: currencyB[0] === 'XHV' ? 1: 0 );

    return (
      <Table>
        <TableHeader>
          <Title>Haven Assets</Title>
          <Subtitle left>
            Private, anonymous, and untraceable assets available within Haven
            Vault
          </Subtitle>
        </TableHeader>
        {this.renderTokens(tickerList)}
        <TableFooter to="/create">View all 12 assets</TableFooter>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  xhvVsCurrencies: state.xhvVsCurrencies
});

export const AssetTableWeb = connect(
  mapStateToProps,
  { fetchCurrencies: xhvVsCurrenciesFetch }
)(AssetTable);
