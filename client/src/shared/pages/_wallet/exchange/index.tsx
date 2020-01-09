// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Form from "../../../components/_inputs/form";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Transaction from "../../../components/_transactions/exchange";
import Tab from "../../../components/tab";
import { Container, Failed } from "./styles";
import {
  ConversionRate,
  selectLatestXRates,
  hasLatestXRate,
  XRates
} from "platforms/desktop/reducers/blockHeaderExchangeRates";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectNodeHeight } from "platforms/desktop/reducers/chain";
import { getLastBlockHeader } from "platforms/desktop/actions/blockHeaderExchangeRate";
import {
  offshore,
  onshore,
  resetExchangeProcess
} from "platforms/desktop/actions";
import { Ticker } from "shared/reducers/types";
import {
  exchangeSucceed,
  isProcessingExchange
} from "platforms/desktop/reducers/offshoreProcess";

type ExchangeProps = {
  conversionRates: XRates | null;
  nodeHeight: number;
  getLastBlockHeader: () => void;
  onshore: typeof onshore;
  offshore: typeof offshore;
  resetExchangeProcess: typeof resetExchangeProcess;
  isProcessingExchange: boolean;
  hasLatestXRate: boolean;
  exchangeSucceed: boolean;
};

type ExchangeState = {
  fromAsset?: AssetOption;
  fromAmount?: string;
  toAmount?: string;
  toAsset?: AssetOption;
  xRate?: number;
  xRateRevert?: number;
  reviewed?: boolean;
  // firstTabState: boolean;
  // secondTabState: boolean;
};

export interface AssetOption {
  ticker: Ticker;
  name: string;
}

const options: AssetOption[] = [
  { name: "Haven Token", ticker: Ticker.XHV },
  { name: "United States Dollar", ticker: Ticker.xUSD }
];

const INITIAL_STATE = {
  fromAsset: options[0],
  fromAmount: "",
  toAmount: "",
  toAsset: options[1],
  xRate: undefined,
  xRateRevert: undefined,
  reviewed: false
  // firstTabState: true,
  // secondTabState: false
};
class Exchange extends Component<ExchangeProps, ExchangeState> {
  state: ExchangeState = INITIAL_STATE;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getLastBlockHeader();
    this.setRates();
  }

  componentWillReceiveProps(
    nextProps: Readonly<ExchangeProps>,
    nextContext: any
  ): void {
    if (!this.props.exchangeSucceed && nextProps.exchangeSucceed) {
      this.props.resetExchangeProcess();
      this.setState({ ...INITIAL_STATE });
    }
  }

  onEnterFromAmount = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(
      {
        [name]: value
      },
      () => this.calcConversion(true)
    );
  };

  onEnterToAmount = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(
      {
        [name]: value
      },
      () => this.calcConversion(false)
    );
  };

  setFromAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.setState({ fromAsset: option }, () => this.setRates());

    if (this.state.toAsset === option) {
      this.setState({ toAsset: undefined });
    }
  };

  setToAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.setState(
      {
        toAsset: option
      },
      () => this.setRates()
    );

    if (this.state.fromAsset === option) {
      this.setState({ fromAsset: undefined });
    }
  };

  handleReviewSubmit = (event: any) => {
    const { checked } = event.target;
    this.setState({ reviewed: checked });
  };

  setRates() {
    const { fromAsset, toAsset } = this.state;

    if (
      fromAsset === undefined ||
      toAsset === undefined ||
      toAsset === fromAsset
    ) {
      this.setState({ xRate: undefined, xRateRevert: undefined });
      return;
    }

    let isReverted = false;
    let matchedConversionRate: ConversionRate | undefined = undefined;

    const fromTicker = fromAsset.ticker;
    const toTicker = toAsset.ticker;

    if (this.props.conversionRates === null) {
      return;
    }

    for (const conversionRate of this.props.conversionRates.rates) {
      if (
        conversionRate.fromTicker === fromTicker &&
        conversionRate.toTicker === toTicker
      ) {
        matchedConversionRate = conversionRate;
        break;
      }
      if (
        conversionRate.toTicker === fromTicker &&
        conversionRate.fromTicker === toTicker
      ) {
        matchedConversionRate = conversionRate;
        isReverted = true;
        break;
      }
    }
    if (matchedConversionRate === undefined) {
      return;
    }

    this.setState(
      state => {
        if (matchedConversionRate === undefined) {
          return state;
        }

        return {
          xRate: isReverted
            ? matchedConversionRate.xRateRevert
            : matchedConversionRate.xRate,
          xRateRevert: isReverted
            ? matchedConversionRate.xRate
            : matchedConversionRate.xRateRevert
        };
      },
      () => {
        this.calcConversion();
      }
    );
  }

  calcConversion(convertFromTo: boolean = true) {
    let { xRate, xRateRevert, toAmount, fromAmount } = this.state;

    if (xRate === undefined) {
      return;
    }

    if (xRateRevert === undefined) {
      return;
    }

    if (fromAmount !== undefined && convertFromTo) {
      this.setState(
        { toAmount: (parseFloat(fromAmount) * xRate).toFixed(4) },
        () => console.log(this.state)
      );
      return;
    }

    if (toAmount !== undefined && !convertFromTo) {
      this.setState(
        { fromAmount: (parseFloat(toAmount) * xRateRevert).toFixed(4) },
        () => console.log(this.state)
      );
    }
  }

  handleSubmit = () => {
    if (
      !this.state.fromAmount ||
      !this.state.fromAsset ||
      !this.state.toAsset ||
      !this.state.toAmount ||
      !this.state.reviewed
    )
      return;

    const isOffShore =
      this.state.fromAsset.ticker === "XHV" &&
      this.state.toAsset.ticker !== "XHV";
    const fromAmount = parseFloat(this.state.fromAmount);
    const toAmount = parseFloat(this.state.toAmount);

    if (isOffShore) {
      this.props.offshore(
        this.state.fromAsset.ticker,
        this.state.toAsset.ticker,
        fromAmount,
        toAmount
      );
    } else {
      this.props.onshore(
        this.state.fromAsset.ticker,
        this.state.toAsset.ticker,
        fromAmount,
        toAmount
      );
    }
  };

  toggleBasic = () => {
    alert("Basic");
    // this.setState({
    //   firstTabState: true,
    //   secondTabState: false
    // });
  };

  toggleAdvanced = () => {
    alert("Advanced");
    // this.setState({
    //   firstTabState: false,
    //   secondTabState: true
    // });
  };

  render() {
    const { fromAsset, toAsset, fromAmount, toAmount, reviewed } = this.state;

    const fromName = fromAsset ? fromAsset.name : "Select Asset";
    const fromTicker = fromAsset ? fromAsset.ticker : "";

    const toName = toAsset ? toAsset.name : "Select Asset";
    const toTicker = toAsset ? toAsset.ticker : "";

    const { hasLatestXRate, conversionRates } = this.props;

    const isValid: boolean =
      !!(fromAsset && toAsset && fromAmount && toAmount && reviewed) &&
      hasLatestXRate;

    return (
      <Body>
        <Header
          title="Exchange "
          description="Swap to and from various Haven Assets"
        />

        <Tab
          firstTabLabel="Basic"
          secondTabLabel="Advanced"
          firstTabState={true}
          secondTabState={false}
          firstTabClickEvent={this.toggleBasic}
          secondTabClickEvent={this.toggleAdvanced}
          onClick={() => {}}
        />
        {!(hasLatestXRate && conversionRates) && (
          <Failed>Exchange is disabled when Wallet is not synced</Failed>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            label="From Asset"
            placeholder="Select Asset"
            name="from_asset"
            ticker={fromTicker}
            value={fromName}
            options={options}
            onClick={this.setFromAsset}
          />
          <Input
            label="From Amount"
            placeholder="Enter amount"
            type="number"
            name="fromAmount"
            value={fromAmount}
            onChange={this.onEnterFromAmount}
            error={
              fromAsset === undefined ? "Please select an asset first" : ""
            }
            readOnly={fromAsset === undefined}
          />
          <Dropdown
            label="To Asset"
            placeholder="Select Asset"
            name="to_asset"
            value={toName}
            ticker={toTicker}
            options={options}
            onClick={this.setToAsset}
          />
          <Input
            label="To Amount"
            placeholder="Enter amount"
            name="toAmount"
            type="number"
            value={toAmount}
            onChange={this.onEnterToAmount}
            error={toAsset === undefined ? "Please select an asset first" : ""}
            readOnly={toAsset === undefined}
          />
        </Form>
        <Container>
          <Transaction
            state={this.state}
            checked={reviewed}
            onChange={this.handleReviewSubmit}
          />
          <Footer
            onClick={this.handleSubmit}
            label="Exchange"
            validated={isValid}
            loading={this.props.isProcessingExchange}
          />
        </Container>
      </Body>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  conversionRates: selectLatestXRates(state),
  nodeHeight: selectNodeHeight(state),
  isProcessingExchange: isProcessingExchange(state),
  hasLatestXRate: hasLatestXRate(state),
  exchangeSucceed: exchangeSucceed(state)
});

export const ExchangePage = connect(
  mapStateToProps,
  { getLastBlockHeader, onshore, offshore, resetExchangeProcess }
)(Exchange);
