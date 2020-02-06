// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports

import { Cards, Scroller, Wrapper } from "./styles";
import { xhvVsCurrenciesFetch } from "../../actions/xhvVsCurrencies";
import {
  Header,
  Section,
  Subtitle,
  Title
} from "../../../../universal/pages/_public/welcome/styles";
import { GraphTicker } from "../Graph";

class ScrollTicker extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  renderTokens = tickerList => {
    return tickerList.map(info => {
      const [token, data] = info;

      return (
        <Cards ticker={token} key={token}>
          <Header>
            <Section>
              <Title left>{token === "XHV" ? token : "x" + token}</Title>
              <Title>{data.symbol + data.lastPrice.toFixed(2)}</Title>
            </Section>
            <Section>
              <Subtitle>{data.token}</Subtitle>
              <Subtitle>{data.change.toFixed(2) + "%"}</Subtitle>
            </Section>
          </Header>
          <GraphTicker prices={data.prices} ticker={token} />
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

    return (
      <Scroller>
        <Wrapper>{this.renderTokens(tickerList)}</Wrapper>
      </Scroller>
    );
  }
}

const mapStateToProps = state => ({
  xhvVsCurrencies: state.xhvVsCurrencies
});

export const ScrollTickerWeb = connect(
  mapStateToProps,
  { fetchCurrencies: xhvVsCurrenciesFetch }
)(ScrollTicker);
