// Library Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Form from "../../../components/_inputs/form";
import Modal from "../../../components/modal/index.js";

import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Transaction from "../../../components/_transactions/exchange";
import Tab from "../../../components/tab";
import { Container, Failed } from "./styles";
import {
  selectXRate,
  hasLatestXRate,
  XRates,
  priceDelta
} from "platforms/desktop/reducers/blockHeaderExchangeRates";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectNodeHeight } from "platforms/desktop/reducers/chain";
import { getLastBlockHeader } from "platforms/desktop/actions/blockHeaderExchangeRate";
import {
  createExchange,
  resetExchangeProcess
} from "platforms/desktop/actions";
import { Ticker } from "shared/reducers/types";
import {
  selectExchangeSucceed,
  selectIsProcessingExchange,
  selectFromTicker,
  selectToTicker
} from "platforms/desktop/reducers/exchangeProcess";
import { setFromTicker, setToTicker } from "platforms/desktop/actions/exchange";
import { NO_BALANCE, XBalances } from "shared/reducers/xBalance";
import { convertBalanceForReading } from "utility/utility";
import ExchangeSummary from "../../../components/_summaries/exchange-summary/index.js";

enum ExchangeTab {
  Basic,
  Adanvced
}

type ExchangeProps = {
  conversionRates: XRates | null;
  nodeHeight: number;
  getLastBlockHeader: () => void;
  createExchange: typeof createExchange;
  resetExchangeProcess: typeof resetExchangeProcess;
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
  reviewed?: boolean;
  selectedTab: ExchangeTab;
  externAddress: string;
  selectedPrio: ExchangePrioOption;
  estimatedFee: number;
  showModal?: boolean;
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
  { name: "Haven Token", ticker: Ticker.XHV },
  { name: "United States Dollar", ticker: Ticker.xUSD }
];

const exchangePrioOptions: ExchangePrioOption[] = [
  {
    name: "Low:",
    ticker: "Unlocks in ~2 days",
    prio: 1
  },
  { name: "Medium:", ticker: "Unlocks ~18 hours", prio: 2 },
  { name: "High:", ticker: "Unlocks ~6 hours", prio: 3 },
  { name: "Very High:", ticker: "Unlocks ~2 hours", prio: 4 }
];

const INITIAL_STATE: ExchangeState = {
  fromAmount: "",
  toAmount: "",
  reviewed: false,
  selectedTab: ExchangeTab.Basic,
  externAddress: "",
  selectedPrio: exchangePrioOptions[exchangePrioOptions.length - 1],
  estimatedFee: 0,
  showModal: false
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
      this.props.resetExchangeProcess();
      this.setState({
        fromAmount: "",
        toAmount: "",
        reviewed: false,
        externAddress: "",
        estimatedFee: 0
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

  handleReviewSubmit = (event: any) => {
    const { checked } = event.target;
    this.setState({ reviewed: checked });
  };

  calculateFees = (): void => {
    const priceDelta = this.props.priceDelta;

    const { fromAmount, selectedPrio } = this.state;

    if (!fromAmount || !priceDelta) {
      return;
    }

    // Estimate the fee
    const unLockTime: number = 60 * Math.pow(3, 4 - selectedPrio.prio);
    const estimatedFee =
      (priceDelta *
        Math.exp((Math.PI / -1000.0) * (unLockTime - 60)) *
        Number(fromAmount)) /
      1000000000000;
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
        fromAmount: (parseFloat(toAmount) * (1 / xRate)).toFixed(4)
      });
    }
  }

  handleSubmit = () => {
    const { fromTicker, toTicker } = this.props;

    if (
      !this.state.fromAmount ||
      !fromTicker ||
      !toTicker ||
      !this.state.toAmount ||
      !this.state.reviewed
    )
      return;

    const isOffShore = fromTicker === Ticker.XHV && toTicker !== Ticker.XHV;
    const fromAmount = parseFloat(this.state.fromAmount);
    const toAmount = parseFloat(this.state.toAmount);

    if (isOffShore) {
      this.props.createExchange(
        fromTicker,
        toTicker,
        fromAmount,
        toAmount,
        this.state.selectedPrio.prio,
        this.state.externAddress, isOffShore
      );
    }
  };

  toggleBasic = () => {
    this.setState({ selectedTab: ExchangeTab.Basic });
  };

  toggleAdvanced = () => {
    this.setState({ selectedTab: ExchangeTab.Adanvced });
  };

  setExchangePriority = (selectedOption: ExchangePrioOption) => {
    this.setState({ selectedPrio: selectedOption }, () => this.calculateFees());
  };

  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    const {
      fromAmount,
      toAmount,
      reviewed,
      selectedTab,
      selectedPrio,
      externAddress
    } = this.state;

    const { fromTicker, toTicker } = this.props;
    const { hasLatestXRate } = this.props;

    const availBalance = fromTicker
      ? convertBalanceForReading(
          this.props.balances[fromTicker].unlockedBalance
        )
      : NO_BALANCE;
    const fromAsset = assetOptions.find(option => option.ticker === fromTicker);
    const toAsset = assetOptions.find(option => option.ticker === toTicker);

    const isValid: boolean =
      !!(fromTicker && toTicker && fromAmount && toAmount && reviewed) &&
      hasLatestXRate;

    return (
      <Fragment>
        {this.state.showModal && (
          <Modal
            onClick={this.showModal}
            title="Exchange Confirmation"
            description="Please confirm and finalize your exchange transaction"
          >
            <Transaction
              xRate={this.props.xRate}
              fromAmount={fromAmount}
              toAmount={toAmount}
              fromTicker={fromTicker}
              toTicker={toTicker}
              estimatedFee={0}
              checked={reviewed}
              validated={isValid}
              onChange={this.handleReviewSubmit}
              externAddress={externAddress}
            />
          </Modal>
        )}
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
          {!hasLatestXRate && (
            <Failed>
              Sorry, but the ability to exchange assets is temporarily disabled
              until the wallet is completely synced
            </Failed>
          )}
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
                label={
                  "From Amount " +
                  (availBalance !== NO_BALANCE
                    ? `(Avail. ${availBalance})`
                    : "")
                }
                placeholder="Enter amount"
                type="number"
                name="fromAmount"
                disabled={!hasLatestXRate ? true : false}
                value={fromAmount}
                onChange={this.onEnterFromAmount}
                error={
                  fromTicker === null ? "Please select an asset first" : ""
                }
                readOnly={fromTicker === null}
              />
              <Dropdown
                label={
                  "To Amount " +
                  (availBalance !== NO_BALANCE
                    ? `(Avail. ${availBalance})`
                    : "")
                }
                placeholder="Select Asset"
                name="to_asset"
                value={toAsset ? toAsset.name : "Select Asset"}
                ticker={toTicker}
                options={assetOptions}
                onClick={this.setToAsset}
              />
              <Input
                label={"To Amount "}
                placeholder="Enter amount"
                disabled={!hasLatestXRate ? true : false}
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
                    disabled={!hasLatestXRate ? true : false}
                    onChange={this.onEnterExternAddress}
                  />
                </Fragment>
              )}
            </Form>
            <Container>
              <ExchangeSummary
                xRate={this.props.xRate}
                hasLatestXRate={hasLatestXRate}
                fromAmount={fromAmount}
                toAmount={toAmount}
                fromTicker={fromTicker}
                toTicker={toTicker}
                estimatedFee={0}
                checked={reviewed}
                onChange={this.handleReviewSubmit}
              />
              <Footer
                onClick={this.showModal}
                label="Review"
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
    state.offshoreProcess.fromTicker,
    state.offshoreProcess.toTicker
  ),
  nodeHeight: selectNodeHeight(state),
  isProcessingExchange: selectIsProcessingExchange(state.offshoreProcess),
  hasLatestXRate: hasLatestXRate(state),
  exchangeSucceed: selectExchangeSucceed(state.offshoreProcess),
  priceDelta: priceDelta(state),
  fromTicker: selectFromTicker(state.offshoreProcess),
  toTicker: selectToTicker(state.offshoreProcess),
  balances: state.xBalance
});

export const ExchangePage = connect(
  mapStateToProps,
  {
    getLastBlockHeader,
    createExchange,
    resetExchangeProcess,
    setToTicker,
    setFromTicker
  }
)(Exchange);
