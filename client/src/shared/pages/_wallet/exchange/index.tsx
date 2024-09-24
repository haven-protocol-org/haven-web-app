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
import { useNavigate } from "react-router";
import Footer from "../../../components/_inputs/footer";
import Dropdown from "../../../components/_inputs/dropdown";
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
import { setFromTicker, setToTicker, setRequiredCollateral } from "shared/actions/exchange";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceToMoney, iNum } from "utility/utility";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { ExchangeSummary } from "shared/components/_summaries/exchange-summary";
import { AddressEntry } from "../../../reducers/address";
import { WideContainer } from "./styles";
import InputButton from "shared/components/_inputs/input_button";
import bigInt from "big-integer";
import { walletProxy } from "shared/core/proxy";

enum ExchangeTab {
  Basic,
  Advanced,
}

interface ExchangeProps  {
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
  setRequiredCollateral: (fromTicker: Ticker, toTicker: Ticker, fromAmount: number) => void;
  xRate: number;
  requiredCollateral:bigInt.BigInteger | null;
  fromTicker: Ticker | null;
  toTicker: Ticker | null;
  balances: XBalances;
  addresses:AddressEntry [];
  navigate: (path: string) => void;
}

enum TxType {
  Shore, Xasset, None
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
  txType: TxType;
  requiredCollateral: string;
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
  { name: "Bitcoin", ticker: Ticker.xBTC },
  { name: "Gold", ticker: Ticker.XAU },
  { name: "Silver", ticker: Ticker.XAG },
  { name: "Australian Dollar", ticker: Ticker.xAUD },
  { name: "British Pound", ticker: Ticker.xGBP },
  { name: "Chinese Yuan", ticker: Ticker.xCNY },
  { name: "Euro", ticker: Ticker.xEUR },
  { name: "Swiss Franc", ticker: Ticker.xCHF },
];

const xusdOption = { name: "U.S. Dollar", ticker: Ticker.xUSD };
const xhvOption = { name: "Haven", ticker: Ticker.XHV };

const assetOptions: AssetOption[] = [xhvOption, xusdOption, ...xassetOptions];

const deprecatedAssets = [Ticker.xAUD, Ticker.xGBP, Ticker.xCNY, Ticker.xEUR, Ticker.xCHF];

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
  txType: TxType.Shore,
  selectedAddress: ALL_ADDRESSES,
  requiredCollateral: ""
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
     this.props.navigate("/wallet/assets/" + this.sendTicker);
    }

    if(this.props.requiredCollateral !== prevProps.requiredCollateral) {
      if (this.props.requiredCollateral !== null) {
        const collateral = convertBalanceToMoney(this.props.requiredCollateral);
        this.setState({requiredCollateral:collateral.toString()})
      } 
    }

    if (this.props.toTicker !== prevProps.toTicker) {
      this.setConversionType(this.props.fromTicker, this.props.toTicker);
    }
    if (this.props.fromTicker !== prevProps.fromTicker) {
      this.setConversionType(this.props.fromTicker, this.props.toTicker);
      this.setToAssetOptions(this.props.fromTicker);
    }
  }

  setMaxAmount = async () => {

    if(this.state.txType === TxType.None) {
      return;
    }

    let amount = await (walletProxy.getMaxDestinationAmount(this.props.fromTicker!, this.props.toTicker!));
    amount = convertBalanceToMoney(amount);

    const {txType} = this.state;
    const {fromTicker} = this.props;
    let stateUpdate;
    let setToAmount: boolean; 

    switch (txType) {

      case TxType.Shore:
        stateUpdate = {fromAmount: amount};
        setToAmount = true;
        break;
      case TxType.Xasset:
        stateUpdate = fromTicker === Ticker.xUSD ? {fromAmount: amount} : {toAmount: amount};
        setToAmount = fromTicker === Ticker.xUSD ? true : false;
        break;
    }
        this.setState({...stateUpdate}, () => {
          this.calcConversion(setToAmount);
        });
    
  }

  requestRequiredCollateral = () => {

    if (this.state.txType !== TxType.Shore) {
      return;
    }

    if (!this.state.fromAmount) {
      this.setState({requiredCollateral:''})
      return;
    }

    
    this.props.setRequiredCollateral(this.props.fromTicker!, this.props.toTicker!, this.state.fromAmount)

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
      this.setState({ toOptions: [xhvOption, ...xassetOptions.filter(asset => !deprecatedAssets.includes(asset.ticker))] });
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

    if (deprecatedAssets.includes(toTicker)) {
      return true;
    }
    return false;
  }

  setConversionType(fromTicker: Ticker | null, toTicker: Ticker | null) {

    let txType: TxType;
    if(fromTicker === null || toTicker === null) {
      txType = TxType.None;
      this.setState({fromAmount: 0, toAmount:0})
      return;
    }
    else if(fromTicker === Ticker.XHV || toTicker === Ticker.XHV) {
      txType = TxType.Shore;
    }
    else {
      txType = TxType.Xasset;
    }

    this.setState({
      txType
    }, () => this.calcConversion());
  }

  calcConversion(setToAmount: boolean = true) {
    const { toAmount, fromAmount } = this.state;
    const { xRate } = this.props;

    if (xRate === 0) {
      return;
    }

    if (fromAmount !== undefined && setToAmount) {
      const toAmount = parseFloat(iNum(fromAmount * xRate));

      this.setState({ toAmount }
        , () => this.requestRequiredCollateral());
      return;
    }

    if (toAmount !== undefined && !setToAmount) {
      const fromAmount = parseFloat(iNum(toAmount * (1 / xRate)));
      this.setState({
        fromAmount,
      }, () => this.requestRequiredCollateral());
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

    if (fromAmountValid && toAmountValid && hasLatestXRate && hasEnoughFunds && this.hasEnoughForCollateral()) {
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

  hasEnoughForCollateral = () => {

    const {fromTicker, toTicker, requiredCollateral} = this.props;
    const {txType, fromAmount} = this.state;
    if (txType === TxType.Shore && requiredCollateral !== null) {

      const collateral = convertBalanceToMoney(requiredCollateral);
      const availBalance = convertBalanceToMoney(
          this.props.balances[Ticker.XHV].unlockedBalance);

      if (fromTicker === Ticker.XHV && fromAmount !== undefined) {
        if(availBalance < (fromAmount + collateral)) {
          return false;
        }
      }
      else if(toTicker === Ticker.XHV) {
        if(availBalance < collateral) {
          return false;
      }
    }
  }
    return true
  }

  getCollateralError = () => {

    if(this.hasEnoughForCollateral())
    return "";
    return "not enough funds for collateral";

  }

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
      txType,
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
    return (
      <Fragment>
        <Body>
          <Header
            title="Convert "
            description="Swap between all available Haven assets"
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
  requiredCollateral: state.exchangeProcess.requiredCollateral,
  addresses: [ALL_ADDRESSES, ...state.address.entrys],
});

//@ts-ignore
const ConnectedExchangePage  = (
  connect(mapStateToProps, {
    createExchange,
    setToTicker,
    setFromTicker,
    setRequiredCollateral,
    showModal,
  })(Exchange)
);


export const ExchangePage = () => {
  const navigate = useNavigate();
  return <ConnectedExchangePage navigate={navigate} />
}