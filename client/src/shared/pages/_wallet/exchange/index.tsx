// Library Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
// import InputButton from "../../../components/_inputs/input_button";
import Form from "../../../components/_inputs/form";

import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Tab from "../../../components/tab";
import { Container, Failed } from "./styles";
import {
  selectXRate,
  hasLatestXRate,
  XRates,
  priceDelta,
} from "shared/reducers/blockHeaderExchangeRates";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectNodeHeight } from "platforms/desktop/reducers/chain";
import { getLastBlockHeader } from "platforms/desktop/actions/blockHeaderExchangeRate";
import { exchange } from "platforms/desktop/actions";
import { Ticker } from "shared/reducers/types";
import {
  selectExchangeSucceed,
  selectIsProcessingExchange,
  selectFromTicker,
  selectToTicker,
} from "platforms/desktop/reducers/exchangeProcess";
import { setFromTicker, setToTicker } from "platforms/desktop/actions/exchange";
import { NO_BALANCE, XBalances } from "shared/reducers/xBalance";
import { convertBalanceForReading } from "utility/utility";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { ExchangeSummary } from "shared/components/_summaries/exchange-summary";

enum ExchangeTab {
  Basic,
  Adanvced,
}

type ExchangeProps = {
  conversionRates: XRates | null;
  nodeHeight: number;
  getLastBlockHeader: () => void;
  showModal: (modalTyoe: MODAL_TYPE) => void;
  createExchange: typeof exchange;
  isProcessingExchange: boolean;
  hasLatestXRate: boolean;
  exchangeSucceed: boolean;
  priceDelta: number | null;
  setFromTicker: (ticker: Ticker | null) => void;
  setToTicker: (ticker: Ticker | null) => void;
  xRate: number;
  fromTicker: Ticker | null;
  toTicker: Ticker | null;
  balances: XBalances;
};

type ExchangeState = {
  fromAmount?: string;
  toAmount?: string;
  selectedTab: ExchangeTab;
  externAddress: string;
  selectedPrio: ExchangePrioOption;
  reviewed: boolean;
};

export interface AssetOption {
  ticker: Ticker;
  name: string;
}

export interface ExchangePrioOption {
  ticker: string;
  name: string;
  prio: number;
}

const assetOptions: AssetOption[] = [
  { name: "Haven", ticker: Ticker.XHV },
  { name: "United States Dollar", ticker: Ticker.xUSD },
];

const exchangePrioOptions: ExchangePrioOption[] = [
  {
    name: "Low:",
    ticker: "Unlocks in ~2 days",
    prio: 1,
  },
  { name: "Medium:", ticker: "Unlocks ~18 hours", prio: 2 },
  { name: "High:", ticker: "Unlocks ~6 hours", prio: 3 },
  { name: "Very High:", ticker: "Unlocks ~2 hours", prio: 4 },
];

const INITIAL_STATE: ExchangeState = {
  fromAmount: "",
  toAmount: "",
  selectedTab: ExchangeTab.Basic,
  externAddress: "",
  selectedPrio: exchangePrioOptions[exchangePrioOptions.length - 1],
  reviewed: false
};
class Exchange extends Component<ExchangeProps, ExchangeState> {
  state: ExchangeState = INITIAL_STATE;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getLastBlockHeader();
  }

  componentWillReceiveProps(
    nextProps: Readonly<ExchangeProps>,
    nextContext: any
  ): void {
    if (!this.props.exchangeSucceed && nextProps.exchangeSucceed) {
      this.setState({
        fromAmount: "",
        toAmount: "",
        externAddress: "",
      });
    }
  }

  onEnterFromAmount = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.state, [name]: value }, () => {
      this.calcConversion(true);
    });
  };

  onEnterExternAddress = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.state, [name]: value });
  };

  onEnterToAmount = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.state, [name]: value }, () => {
      this.calcConversion(false);
    });
  };

  setFromAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.props.setFromTicker(option.ticker);

    if (this.props.toTicker === option.ticker) {
      this.props.setToTicker(null);
    }
  };

  setToAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.props.setToTicker(option.ticker);
    if (this.props.fromTicker === option.ticker) {
      this.props.setFromTicker(null);
    }
  };

  calcConversion(setToAmount: boolean = true) {
    const { toAmount, fromAmount } = this.state;
    const { xRate } = this.props;

    if (xRate === 0) {
      return;
    }

    if (fromAmount !== undefined && setToAmount) {
      this.setState({ toAmount: (parseFloat(fromAmount) * xRate).toFixed(4) });
      return;
    }

    if (toAmount !== undefined && !setToAmount) {
      this.setState({
        fromAmount: (parseFloat(toAmount) * (1 / xRate)).toFixed(4),
      });
    }
  }

  handleSubmit = () => {
    const { fromTicker, toTicker } = this.props;

    if (
      !this.state.fromAmount ||
      !fromTicker ||
      !toTicker ||
      !this.state.toAmount
    )
      return;

    const isOffShore = fromTicker === Ticker.XHV && toTicker !== Ticker.XHV;
    const fromAmount = parseFloat(this.state.fromAmount);
    const toAmount = parseFloat(this.state.toAmount);

    this.props.createExchange(
      fromTicker,
      toTicker,
      fromAmount,
      toAmount,
      this.state.selectedPrio.prio,
      this.state.externAddress,
      isOffShore
    );
  };

  handleReviewSubmit = (event: any) => {
    const { checked } = event.target;
    this.setState({ reviewed: checked });
  };

  toggleBasic = () => {
    this.setState({ selectedTab: ExchangeTab.Basic });
  };

  toggleAdvanced = () => {
    this.setState({ selectedTab: ExchangeTab.Adanvced });
  };

  setExchangePriority = (selectedOption: ExchangePrioOption) => {
    this.setState({ selectedPrio: selectedOption });
  };

  setMaxFromAmount = () => {
    const { fromTicker } = this.props;

    const availBalance = fromTicker
      ? convertBalanceForReading(
          this.props.balances[fromTicker].unlockedBalance
        )
      : NO_BALANCE;

    this.setState({ ...this.state, fromAmount: availBalance }, () => {
      this.calcConversion(true);
    });
  };

  setMaxToAmount = () => {
    const { toTicker } = this.props;

    const availBalance = toTicker
      ? convertBalanceForReading(this.props.balances[toTicker].unlockedBalance)
      : NO_BALANCE;

    this.setState({ ...this.state, toAmount: availBalance }, () => {
      this.calcConversion(false);
    });
  };

  render() {
    const {
      fromAmount,
      toAmount,
      selectedTab,
      selectedPrio,
      externAddress,
    } = this.state;

    const { fromTicker, toTicker } = this.props;
    const { hasLatestXRate } = this.props;

    const availBalance = fromTicker
      ? convertBalanceForReading(
          this.props.balances[fromTicker].unlockedBalance
        )
      : NO_BALANCE;

    const fromAsset = assetOptions.find(
      (option) => option.ticker === fromTicker
    );

    const toAsset = assetOptions.find((option) => option.ticker === toTicker);

    const toBalance = toTicker
      ? convertBalanceForReading(this.props.balances[toTicker].unlockedBalance)
      : NO_BALANCE;

    const isValid: boolean =
      !!(fromTicker && toTicker && fromAmount && toAmount) && hasLatestXRate && this.state.reviewed;

    return (
      <Fragment>
        <Body>
          <Header
            title="Exchange "
            description="Swap to and from various Haven Assets"
          />
          <Tab
            firstTabLabel="Basic"
            secondTabLabel="Advanced"
            firstTabState={selectedTab === ExchangeTab.Basic}
            secondTabState={selectedTab === ExchangeTab.Adanvced}
            firstTabClickEvent={this.toggleBasic}
            secondTabClickEvent={this.toggleAdvanced}
            onClick={() => {}}
          />
          <Fragment>
            <Form onSubmit={this.handleSubmit}>
              <Dropdown
                label="From Asset"
                placeholder="Select Asset"
                name="from_asset"
                ticker={fromTicker}
                value={fromAsset ? fromAsset.name : "Select Asset"}
                options={assetOptions}
                onClick={this.setFromAsset}
              />
              <Input
                // @ts-ignore
                label={
                  "From Amount " +
                  (availBalance !== NO_BALANCE
                    ? `(Balance: ${availBalance})`
                    : "")
                }
                placeholder="Enter amount"
                type="number"
                name="fromAmount"
                disabled={!hasLatestXRate}
                value={fromAmount}
                onChange={this.onEnterFromAmount}
                error={
                  fromTicker === null ? "Please select an asset first" : ""
                }
                readOnly={fromTicker === null}
              />
              <Dropdown
                label={"To Amount "}
                placeholder="Select Asset"
                name="to_asset"
                value={toAsset ? toAsset.name : "Select Asset"}
                ticker={toTicker}
                options={assetOptions}
                onClick={this.setToAsset}
              />
              <Input
                // @ts-ignore
                label={
                  "To Amount " +
                  (toBalance !== NO_BALANCE ? `(Balance: ${toBalance})` : "")
                }
                placeholder="Enter amount"
                disabled={!hasLatestXRate}
                name="toAmount"
                type="number"
                value={toAmount}
                onChange={this.onEnterToAmount}
                error={toTicker === null ? "Please select an asset first" : ""}
                readOnly={toTicker === null}
              />
              {selectedTab === ExchangeTab.Adanvced && (
                <Fragment>
                  <Dropdown
                    label="Priority"
                    placeholder="Select Priority"
                    name="exchange_priority"
                    value={selectedPrio.name}
                    ticker={selectedPrio.ticker}
                    options={exchangePrioOptions}
                    onClick={this.setExchangePriority}
                  />
                  <Input
                    label="Exchange Address (Optional)"
                    placeholder="Exchange to another address"
                    name="externAddress"
                    type="text"
                    value={externAddress}
                    disabled={!hasLatestXRate}
                    onChange={this.onEnterExternAddress}
                  />
                </Fragment>
              )}
              {!hasLatestXRate && (
                <Failed>
                  The ability to Exchange assets is temporarily disabled until
                  the wallet is completely synced...
                </Failed>
              )}
            </Form>
            <Container>
              <ExchangeSummary
                xRate={this.props.xRate}
                fromAmount={fromAmount}
                toAmount={toAmount}
                toTicker={toTicker}
                hasLatestXRate={hasLatestXRate}
                fee={"-"}
                fromTicker={fromTicker}
                checked={this.state.reviewed}
                onChange={this.handleReviewSubmit}
              />

              <Footer
                onClick={() => this.handleSubmit()}
                label="Exchange"
                validated={isValid}
                loading={this.props.isProcessingExchange}
              />
            </Container>
          </Fragment>
        </Body>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  xRate: selectXRate(
    state.blockHeaderExchangeRate,
    state.exchangeProcess.fromTicker,
    state.exchangeProcess.toTicker
  ),
  nodeHeight: selectNodeHeight(state),
  isProcessingExchange: selectIsProcessingExchange(state.exchangeProcess),
  hasLatestXRate: hasLatestXRate(state),
  exchangeSucceed: selectExchangeSucceed(state.exchangeProcess),
  priceDelta: priceDelta(state),
  fromTicker: selectFromTicker(state.exchangeProcess),
  toTicker: selectToTicker(state.exchangeProcess),
  balances: state.xBalance,
});

export const ExchangePage = connect(mapStateToProps, {
  getLastBlockHeader,
  createExchange: exchange,
  setToTicker,
  setFromTicker,
  showModal,
})(Exchange);
