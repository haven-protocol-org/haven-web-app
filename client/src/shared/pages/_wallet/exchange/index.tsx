// Library Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
// import InputButton from "../../../components/_inputs/input_button";
import Form from "../../../components/_inputs/form";
import { RouteComponentProps, withRouter } from "react-router";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Tab from "../../../components/tab";
import { Container } from "./styles";
import {
  hasLatestXRate,
  priceDelta,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectNodeHeight } from "shared/reducers/chain";
import { createExchange } from "platforms/desktop/actions";
import { Ticker } from "shared/reducers/types";
import {
  ExchangeType,
  selectExchangeSucceed,
  selectFromTicker,
  selectIsProcessingExchange,
  selectToTicker,
} from "shared/reducers/exchangeProcess";
import { setFromTicker, setToTicker } from "shared/actions/exchange";
import { NO_BALANCE, XBalances } from "shared/reducers/xBalance";
import { convertBalanceToMoney } from "utility/utility";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { ExchangeSummary } from "shared/components/_summaries/exchange-summary";

enum ExchangeTab {
  Basic,
  Advanced,
}

interface ExchangeProps extends RouteComponentProps<any> {
  nodeHeight: number;
  showModal: (modalTyoe: MODAL_TYPE) => void;
  createExchange: typeof createExchange;
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
}

type ExchangeState = {
  fromAmount?: string;
  toAmount?: string;
  selectedTab: ExchangeTab;
  externAddress: string;
  selectedPrio: ExchangePrioOption;
  hasEnough: boolean;
  fromOptions: AssetOption[];
  toOptions: AssetOption[];
};

 interface AssetOption {
  ticker: Ticker;
  name: string;
}

export interface ExchangePrioOption {
  ticker: string;
  name: string;
  prio: number;
  percent: string;
}

const assetOptions: AssetOption[] = [
  { name: "Haven", ticker: Ticker.XHV },
  { name: "United States Dollar", ticker: Ticker.xUSD },
  { name: "Yuan", ticker: Ticker.xCNY },
  { name: "Euro", ticker: Ticker.xEUR },
  { name: "Gold", ticker: Ticker.XAU },
  { name: "Silver", ticker: Ticker.XAG },

];

const exchangePrioOptions: ExchangePrioOption[] = [
  { name: "Default", ticker: "Unlocks ~7d", percent: "0.2%", prio: 0 },
  { name: "Low", ticker: "Unlocks ~48h", percent: "5%", prio: 1 },
  { name: "Medium", ticker: "Unlocks ~24h", percent: "10%", prio: 2 },
  { name: "High", ticker: "Unlocks ~6h", percent: "20%", prio: 3 },
];

const INITIAL_STATE: ExchangeState = {
  fromAmount: "",
  toAmount: "",
  selectedTab: ExchangeTab.Basic,
  externAddress: "",
  selectedPrio: exchangePrioOptions[0],
  hasEnough: false,
  fromOptions: [...assetOptions],
  toOptions: [...assetOptions]
};
class Exchange extends Component<ExchangeProps, ExchangeState> {
  private sendTicker: Ticker = Ticker.XHV;

  state: ExchangeState = INITIAL_STATE;

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(
    nextProps: Readonly<ExchangeProps>,
    nextContext: any
  ): void {
    if (!this.props.exchangeSucceed && nextProps.exchangeSucceed) {
      this.setState({
        fromAmount: "",
        toAmount: "",
        externAddress: "",
      });

      this.props.history.push("/wallet/assets/" + this.sendTicker);
    }

    if (this.props.toTicker !== nextProps.toTicker) {
      this.calcConversion();
    }
    if (this.props.fromTicker !== nextProps.fromTicker) {
      this.calcConversion();
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
      this.setState({ toAmount: (parseFloat(fromAmount) * xRate).toFixed(2) });
      return;
    }

    if (toAmount !== undefined && !setToAmount) {
      this.setState({
        fromAmount: (parseFloat(toAmount) * (1 / xRate)).toFixed(2),
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

    const exchangeType =
      fromTicker === Ticker.XHV && toTicker !== Ticker.XHV
        ? ExchangeType.Offshore
        : ExchangeType.Onshore;
    const fromAmount = parseFloat(this.state.fromAmount);
    const toAmount = parseFloat(this.state.toAmount);

    this.sendTicker = fromTicker;

    this.props.createExchange(
      fromTicker,
      toTicker,
      fromAmount,
      toAmount,
      this.state.selectedPrio.prio,
      this.state.externAddress    );
  };

  toggleBasic = () => {
    this.setState({
      selectedTab: ExchangeTab.Basic,
      selectedPrio: exchangePrioOptions[0],
    });
  };

  toggleAdvanced = () => {
    this.setState({ selectedTab: ExchangeTab.Advanced });
  };

  setExchangePriority = (selectedOption: ExchangePrioOption) => {
    this.setState({ selectedPrio: selectedOption });
  };

  setMaxFromAmount = () => {
    const { fromTicker } = this.props;

    const availBalance = fromTicker
      ? convertBalanceToMoney(this.props.balances[fromTicker].unlockedBalance)
      : NO_BALANCE;

    this.setState(
      { ...this.state, fromAmount: availBalance.toString() },
      () => {
        this.calcConversion(true);
      }
    );
  };

  setMaxToAmount = () => {
    const { toTicker } = this.props;

    const availBalance = toTicker
      ? convertBalanceToMoney(this.props.balances[toTicker].unlockedBalance)
      : NO_BALANCE;

    this.setState({ ...this.state, toAmount: availBalance.toString() }, () => {
      this.calcConversion(false);
    });
  };

  validateExchange = (availableBalance: any) => {
    const { fromAmount, toAmount } = this.state;
    const fromAmountValid = fromAmount !== "";
    const toAmountValid = toAmount !== "";
    const { hasLatestXRate } = this.props;
    const hasEnoughFunds =
      fromAmount !== undefined ? fromAmount < availableBalance : false;

    if (fromAmountValid && toAmountValid && hasLatestXRate && hasEnoughFunds) {
      // If valid then make this 'false' so the footer is enabled
      return false;
    } else {
      // If invalid then make this 'true' so the footer is disabled
      return true;
    }
  };

  toAmountIsValid = (availableBalance: any) => {
    const { toAmount } = this.state;

    //@ts-ignore
    if (convertToNum > convertBalance) {
      return "Not enough funds";
    }
  };

  fromAmountIsValid = (availableBalance: any) => {
    const { fromAmount } = this.state;

    const availableBalanceString = availableBalance.toString();

    // const convertToNum = parseFloat(fromAmount);
    // const convertBalance = parseFloat(availableBalance);

    //@ts-ignore
    if (fromAmount > availableBalance) {
      return "Not enough funds";
    }
    //@ts-ignore
    if (fromAmount === availableBalanceString) {
      return "Save some for fees";
    }
  };

  recipientIsValid = () => {
    const { externAddress } = this.state;
    if (externAddress.length > 97) {
      return "";
    } else if (externAddress === "") {
      return "";
    } else {
      return "Enter a valid address";
    }
  };

  calculateFeeEstimate = () => {
    const { selectedPrio, fromAmount } = this.state;
    const { prio } = selectedPrio;
    const amount = Number(fromAmount);
    if (prio === 0) {
      return amount * 0.002;
    } else if (prio === 1) {
      return amount * 0.05;
    } else if (prio === 2) {
      return amount * 0.1;
    } else if (prio === 3) {
      return amount * 0.2;
    } else {
      return null;
    }
  };

  render() {
    const {
      fromAmount,
      toAmount,
      selectedTab,
      selectedPrio,
      externAddress,
      fromOptions,
      toOptions
    } = this.state;

    const { fromTicker, toTicker } = this.props;
    const { hasLatestXRate } = this.props;

    const availBalance = fromTicker
      ? convertBalanceToMoney(this.props.balances[fromTicker].unlockedBalance)
      : NO_BALANCE;

    const fromAsset = assetOptions.find(
      (option) => option.ticker === fromTicker
    );

    const toAsset = assetOptions.find((option) => option.ticker === toTicker);

    const toBalance = toTicker
      ? convertBalanceToMoney(this.props.balances[toTicker].unlockedBalance)
      : NO_BALANCE;

    return (
      <Fragment>
        <Body>
          <Header
            title="Convert "
            description="Swap between all available Haven assets"
          />
          <Tab
            firstTabLabel="Basic"
            secondTabLabel="Advanced"
            firstTabState={selectedTab === ExchangeTab.Basic}
            secondTabState={selectedTab === ExchangeTab.Advanced}
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
                options={fromOptions}
                onClick={this.setFromAsset}
              />
              <Input
                // @ts-ignore
                label={
                  "From Amount " +
                  (availBalance !== NO_BALANCE
                    ? `(Avail: ${availBalance})`
                    : "")
                }
                placeholder="Enter amount"
                type="number"
                name="fromAmount"
                // @ts-ignore
                value={fromAmount}
                onChange={this.onEnterFromAmount}
                error={this.fromAmountIsValid(availBalance)}
                readOnly={fromTicker === null}
              />
              <Dropdown
                label={"To Asset"}
                placeholder="Select Asset"
                name="to_asset"
                value={toAsset ? toAsset.name : "Select Asset"}
                ticker={toTicker}
                options={toOptions}
                onClick={this.setToAsset}
              />
              <Input
                // @ts-ignore
                label={
                  "To Amount " +
                  (toBalance !== NO_BALANCE ? `(Avail: ${toBalance})` : "")
                }
                placeholder="Enter amount"
                name="toAmount"
                type="number"
                value={toAmount}
                onChange={this.onEnterToAmount}
                error={toTicker === null ? "Please select an asset first" : ""}
                readOnly={toTicker === null}
              />
              {selectedTab === ExchangeTab.Advanced && (
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
                    label="Recipient Address (Optional)"
                    placeholder="Exchange to another address"
                    name="externAddress"
                    type="text"
                    value={externAddress}
                    onChange={this.onEnterExternAddress}
                    error={this.recipientIsValid()}
                  />
                </Fragment>
              )}
            </Form>
            <Container>
              <ExchangeSummary
                xRate={this.props.xRate}
                fromAmount={fromAmount}
                toAmount={toAmount}
                toTicker={toTicker}
                hasLatestXRate={hasLatestXRate}
                fee={this.calculateFeeEstimate()}
                fromTicker={fromTicker}
                selectedPrio={selectedPrio}
              />
              <Footer
                onClick={() => this.handleSubmit()}
                label="Preview"
                disabled={this.validateExchange(availBalance)}
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

export const ExchangePage = withRouter(
  connect(mapStateToProps, {
    createExchange,
    setToTicker,
    setFromTicker,
    showModal,
  })(Exchange)
);
