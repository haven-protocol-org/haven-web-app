// Library Imports
import { Component, Fragment } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Input from "../../../components/_inputs/input";
import Description from "../../../components/_inputs/description";
import AddressDropdown from "../../../components/_inputs/addresses_dropdown";
// import InputButton from "../../../components/_inputs/input_button";
import Form from "../../../components/_inputs/form";
import { RouteComponentProps, withRouter } from "react-router";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
import Tab from "../../../components/tab";

import {
  hasLatestXRate,
  priceDelta,
  selectXRate,
  BlockHeaderRate,
  selectLastExchangeRates
} from "shared/reducers/blockHeaderExchangeRates";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectNodeHeight } from "shared/reducers/chain";
import { createExchange } from "platforms/desktop/actions";
import { Ticker } from "shared/reducers/types";
import {
  selectExchangeSucceed,
  selectFromTicker,
  selectIsProcessingExchange,
  selectToTicker,
} from "shared/reducers/exchangeProcess";
import { setFromTicker, setToTicker } from "shared/actions/exchange";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceToMoney, iNum } from "utility/utility";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { ExchangeSummary } from "shared/components/_summaries/exchange-summary";
import { AddressEntry } from "../../../reducers/address";
import { WideContainer } from "./styles";

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
  lastExchangeRates: BlockHeaderRate | null;
  setFromTicker: (ticker: Ticker | null) => void;
  setToTicker: (ticker: Ticker | null) => void;
  xRate: number;
  fromTicker: Ticker | null;
  toTicker: Ticker | null;
  balances: XBalances;
  addresses:AddressEntry [];
}

type ExchangeState = {
  fromAmount?: number;
  toAmount?: number;
  selectedTab: ExchangeTab;
  externAddress: string;
  selectedPrio: ExchangePrioOption;
  hasEnough: boolean;
  fromOptions: AssetOption[];
  toOptions: AssetOption[];
  xassetConversion: boolean;
  selectedAddress:AddressEntry;
};

interface AssetOption {
  ticker: Ticker;
  name: string;
}

export interface ExchangePrioOption {
  ticker: string;
  name: string;
  prio: number;
}

const xassetOptions: AssetOption[] = [
  { name: "Yuan", ticker: Ticker.xCNY },
  { name: "Euro", ticker: Ticker.xEUR },
  { name: "Gold", ticker: Ticker.XAU },
  { name: "Silver", ticker: Ticker.XAG },
  { name: "Bitcoin", ticker: Ticker.xBTC },
  { name: "Swiss Franc", ticker: Ticker.xCHF },
  { name: "Australian Dollar", ticker: Ticker.xAUD },
  { name: "British Pound", ticker: Ticker.xGBP },
];

const xusdOption = { name: "U.S Dollar", ticker: Ticker.xUSD };
const xhvOption = { name: "Haven", ticker: Ticker.XHV };

const assetOptions: AssetOption[] = [xhvOption, xusdOption, ...xassetOptions];

const exchangePrioOptions: ExchangePrioOption[] = [
  { name: "Default", ticker: "Unlocks ~21d", prio: 0 },
  { name: "Low", ticker: "Unlocks ~21d", prio: 1 },
  { name: "Medium", ticker: "Unlocks ~21d", prio: 2 },
  { name: "High", ticker: "Unlocks ~21d", prio: 3 },
];


const ALL_ADDRESSES: AddressEntry = {index:-1, label:"All Addresses", address:"", used: false};

const INITIAL_STATE: ExchangeState = {
  fromAmount: undefined,
  toAmount: undefined,
  selectedTab: ExchangeTab.Advanced,
  externAddress: "",
  selectedPrio: exchangePrioOptions[0],
  hasEnough: false,
  fromOptions: [...assetOptions],
  toOptions: [xusdOption],
  xassetConversion: false,
  selectedAddress: ALL_ADDRESSES,
};

class Exchange extends Component<ExchangeProps, ExchangeState> {
  private sendTicker: Ticker = Ticker.XHV;

  state: ExchangeState = INITIAL_STATE;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.setFromTicker(Ticker.XHV);
    this.props.setToTicker(Ticker.xUSD);
  }

  componentDidUpdate(
    prevProps: Readonly<ExchangeProps>,
    nextContext: any
  ): void {
    if (!this.props.exchangeSucceed && prevProps.exchangeSucceed) {
      this.setState({
        fromAmount: undefined,
        toAmount: undefined,
        externAddress: "",
      });

      this.props.history.push("/wallet/assets/" + this.sendTicker);
    }

    if (this.props.toTicker !== prevProps.toTicker) {
      this.calcConversion();
      this.setConversionType(this.props.fromTicker, this.props.toTicker);
    }
    if (this.props.fromTicker !== prevProps.fromTicker) {
      this.calcConversion();
      this.setConversionType(this.props.fromTicker, this.props.toTicker);
      this.setToAssetOptions(this.props.fromTicker);
    }
  }

  onEnterFromAmount = (event: any) => {
    const name = event.target.name;
    const value = parseFloat(event.target.value);

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
    const value = parseFloat(event.target.value);

    this.setState({ ...this.state, [name]: value }, () => {
      this.calcConversion(false);
    });
  };

  setToAssetOptions(fromTicker: Ticker | null): void {
    if (fromTicker === null) {
      return;
    }

    if (fromTicker === Ticker.XHV) {
      this.setState({ toOptions: [xusdOption] });
      return;
    }

    if (fromTicker === Ticker.xUSD) {
      this.setState({ toOptions: [xhvOption, ...xassetOptions] });
      return;
    }

    // here we can safely assume that a xasset option was selected
    this.setState({ toOptions: [xusdOption] });
  }

  setFromAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.props.setFromTicker(option.ticker);
    //on mismatch, just reset the other ticker
    if (this.isTickerMismatch(option.ticker, this.props.toTicker)) {
      this.props.setToTicker(null);
    }
  };

  setToAsset = (option: AssetOption) => {
    // Call back function from Dropdown
    this.props.setToTicker(option.ticker);
    //on mismatch, just reset the other ticker
    if (this.isTickerMismatch(this.props.fromTicker, option.ticker)) {
      this.props.setFromTicker(null);
    }
  };

  isXassets = (ticker: Ticker | null) => {
    return ticker !== null && ticker !== Ticker.xUSD && ticker !== Ticker.XHV;
  };

  // we need to check a few conversion combinations which are not allowed like XHV -> XEUR ...
  isTickerMismatch(
    toTicker: Ticker | null,
    fromticker: Ticker | null
  ): boolean {
    if (toTicker === null || fromticker === null) {
      return false;
    }

    // transfer not allowed in conversion tab
    if (toTicker === fromticker) {
      return true;
    }

    // conversions from and to XHV only via XUSD
    if (fromticker === Ticker.XHV && toTicker !== Ticker.xUSD) {
      return true;
    }

    if (toTicker === Ticker.XHV && fromticker !== Ticker.xUSD) {
      return true;
    }

    // conversions between xassets not allowed
    if (this.isXassets(fromticker) && this.isXassets(toTicker)) {
      return true;
    }
    return false;
  }

  setConversionType(fromTicker: Ticker | null, toTicker: Ticker | null) {
    const xassetConversion =
      this.isXassets(fromTicker) || this.isXassets(toTicker);
    this.setState({
      xassetConversion,
    });
  }

  calcConversion(setToAmount: boolean = true) {
    const { toAmount, fromAmount } = this.state;
    const { xRate } = this.props;

    if (xRate === 0) {
      return;
    }

    if (fromAmount !== undefined && setToAmount) {
      const toAmount = parseFloat(iNum(fromAmount * xRate));

      this.setState({ toAmount });
      return;
    }

    if (toAmount !== undefined && !setToAmount) {
      const fromAmount = parseFloat(iNum(toAmount * (1 / xRate)));
      this.setState({
        fromAmount,
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

    const { fromAmount, toAmount } = this.state;

    this.sendTicker = fromTicker;

    const selectedAddressIndex = this.state.selectedAddress.index !== -1 ? this.state.selectedAddress.index : undefined;

    this.props.createExchange(
      fromTicker,
      toTicker,
      fromAmount,
      toAmount,
      this.state.selectedPrio.prio,
      this.state.externAddress,
      selectedAddressIndex
    );
  };
/*
  toggleBasic = () => {
    this.setState({
      selectedTab: ExchangeTab.Basic,
      selectedPrio: exchangePrioOptions[0],
    });
  };

  toggleAdvanced = () => {
    this.setState({ selectedTab: ExchangeTab.Advanced });
  };
*/

//TOKENOMICS below - priority always set to default
  setExchangePriority = (selectedOption: ExchangePrioOption) => {
    this.setState({ selectedPrio: exchangePrioOptions[0] });
  };

  validateExchange = (availableBalance: any) => {
    const { fromAmount, toAmount } = this.state;
    const fromAmountValid = fromAmount !== undefined;
    const toAmountValid = toAmount !== undefined;
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

    //@ts-ignore
    if (fromAmount > availableBalance) {
      return "Not enough funds";
    }
    //@ts-ignore
    if (fromAmount === availableBalance) {
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

  selectAddress = (selected: AddressEntry) => {
    this.setState({selectedAddress: selected});
  };

  render() {

    const {
      fromAmount,
      toAmount,
      selectedTab,
      selectedPrio,
      externAddress,
      fromOptions,
      toOptions,
      xassetConversion,
      selectedAddress
    } = this.state;

    const { addresses, fromTicker, toTicker, lastExchangeRates } = this.props;
    const { hasLatestXRate } = this.props;

    let usingSpot = true;

    if(lastExchangeRates !== null && lastExchangeRates !== undefined && lastExchangeRates.hasOwnProperty("UNUSED1") && (fromTicker === Ticker.XHV || toTicker === Ticker.XHV) ){
 
      let last_ma_rate = 0.0;
      if (fromTicker === Ticker.XHV ) {
        //to is xUSD
        last_ma_rate = lastExchangeRates["UNUSED1"].toJSNumber() / Math.pow(10, 12);
   
      } else {
        //from is xUSD
        last_ma_rate = Math.pow(10, 12) / lastExchangeRates["UNUSED1"].toJSNumber();

      }
      if( this.props.xRate === last_ma_rate ){
        usingSpot = false;
      }
    }

    const availBalance = fromTicker
      ? convertBalanceToMoney(
          this.props.balances[fromTicker].unlockedBalance,
          6
        )
      : 0;

    const fromAsset = assetOptions.find(
      (option) => option.ticker === fromTicker
    );

    const toAsset = assetOptions.find((option) => option.ticker === toTicker);

    const toBalance = toTicker
      ? convertBalanceToMoney(this.props.balances[toTicker].unlockedBalance, 6)
      : 0;

    const displayedFromAmount = fromAmount !== undefined ? fromAmount : "";
    const displayedToAmount = toAmount !== undefined ? toAmount : "";
    

    let tabfragment;
    //dissable the basic / advanced tabs
    if(false){
      /*
      tabfragment = <Tab
      firstTabLabel="Basic"
      secondTabLabel="Advanced"
      firstTabState={selectedTab === ExchangeTab.Basic}
      secondTabState={selectedTab === ExchangeTab.Advanced}
      firstTabClickEvent={this.toggleBasic}
      secondTabClickEvent={this.toggleAdvanced}
      onClick={() => {}}
      />;
      */
    }

    const handleLabel =
      selectedAddress!.label === undefined
        ? `Address ${selectedAddress!.index}`
        : selectedAddress!.label;

    let truncated: string;
    if (selectedAddress.index === -1 ) {

      truncated = "(Default)";

    } else {

      const first = selectedAddress!.address.substring(0, 4);
      const last = selectedAddress!.address.substring(selectedAddress!.address.length - 4);
      truncated = first + "...." + last;

    }
//TOKENOMICS below - priority dropdown needs updating
    return (
      <Fragment>
        <Body>
          <Header
            title="Convert "
            description="Swap between all available Haven assets"
          />
          {tabfragment}
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
                  (availBalance !== 0 ? `(Avail: ${iNum(availBalance)})` : "")
                }
                placeholder="Enter amount"
                type="number"
                name="fromAmount"
                // @ts-ignore
                value={displayedFromAmount}
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
                  (toBalance !== 0 ? `(Avail: ${iNum(toBalance)})` : "")
                }
                placeholder="Enter amount"
                name="toAmount"
                type="number"
                value={displayedToAmount}
                onChange={this.onEnterToAmount}
                error={toTicker === null ? "Please select an asset first" : ""}
                readOnly={toTicker === null}
                
              />
            </Form>


            {selectedTab === ExchangeTab.Advanced && (
              <>
                <WideContainer>

                { false && (
                  <Dropdown
                    label="Priority"
                    placeholder="Select Priority"
                    name="exchange_priority"
                    value={xassetConversion ? "Standard" : selectedPrio.name}
                    ticker={
                      xassetConversion ? "Unlocks ~48h" : selectedPrio.ticker
                    }
                    options={exchangePrioOptions}
                    onClick={this.setExchangePriority}
                    disabled={xassetConversion ? true : false}
                  />
                  )}
                  
                  <AddressDropdown
                    label="From Address (Optional)"
                    placeholder="Select from address"
                    name="from_address"
                    value={handleLabel}
                    address={truncated}
                    options={addresses}
                    onClick={this.selectAddress}
                    hideCreateAddress
                  />
                  

                  <Description
                    label="Recipient Address (Optional)"
                    placeholder="Exchange to another address"
                    name="externAddress"
                    type="text"
                    value={externAddress}
                    onChange={this.onEnterExternAddress}
                    error={this.recipientIsValid()}
                    rows="2"
                  />
                </WideContainer>
              </>
            )}
            <WideContainer>
              <ExchangeSummary
                xasset_conversion={this.state.xassetConversion}
                xRate={this.props.xRate}
                fromAmount={iNum(fromAmount)}
                toAmount={iNum(toAmount)}
                toTicker={toTicker}
                hasLatestXRate={hasLatestXRate}
                usingSpot={usingSpot}
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
            </WideContainer>
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
  lastExchangeRates: selectLastExchangeRates(state),
  fromTicker: selectFromTicker(state.exchangeProcess),
  toTicker: selectToTicker(state.exchangeProcess),
  balances: state.xBalance,
  addresses: [ALL_ADDRESSES, ...state.address.entrys],
});

export const ExchangePage = withRouter(
  connect(mapStateToProps, {
    createExchange,
    setToTicker,
    setFromTicker,
    showModal,
  })(Exchange)
);
