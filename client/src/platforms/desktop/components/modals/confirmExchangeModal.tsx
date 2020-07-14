import * as React from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import {
  confirmExchange,
  resetExchangeProcess,
} from "platforms/desktop/actions";
import { Modal } from "shared/components/modal";
import { ExchangeProcessInfo } from "platforms/desktop/reducers/exchangeProcess";
import { hideModal } from "shared/actions/modal";
import Transaction from "shared/components/_transactions/exchange";
import { convertToMoney } from "utility/utility";

interface ConfirmExchangeModalProps {
  exchange: ExchangeProcessInfo;
  confirmExchange: (metaList: Array<string>) => void;
  resetExchangeProcess: () => void;
  hideModal: () => void;
}

class ConfirmExchangeModal extends React.Component<
  ConfirmExchangeModalProps,
  any
> {
  state = {
    checked: false,
    loading: false,
  };

  approveTransfer = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    const {
      address,
      fromAmount,
      toAmount,
      fromTicker,
      toTicker,
      fee,priority
    } = this.props.exchange;

    const readableToAmout = convertToMoney(toAmount);
    const readAbleFromAmount = convertToMoney(fromAmount);
    const readAbleFeeAmount = convertToMoney(fee);
    // ####  Add in the fromAmount ####
    // const readableFromAmout = convertToMoney(fromAmount);

    return (
      <Modal
        title="Exchange Confirmation"
        description="Please review and confirm your transaction"
        leftButton="Cancel"
        rightButton="Confirm"
        disabled={!this.state.checked}
        isLoading={this.state.loading}
        onCancel={() => this.onCancel()}
        onConfirm={() => this.onConfirm()}
      >
        <Transaction
          xRate={1}
          onChange={this.approveTransfer}
          fromAmount={readAbleFromAmount}
          checked={this.state.checked}
          toAmount={readableToAmout}
          fromTicker={fromTicker}
          toTicker={toTicker}
          fee={readAbleFeeAmount}
          externAddress={address}
        />
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
    this.props.resetExchangeProcess();
  }

  onConfirm() {
    const { metaList } = this.props.exchange;
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.props.confirmExchange(metaList);
    }, 3000);
  }

  componentDidUpdate(prevProps: Readonly<ConfirmExchangeModalProps>): void {
    if (this.props.exchange.created === false) {
      this.props.hideModal();
    }
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  exchange: state.exchangeProcess,
});

export const ConfirmExchangeModalDesktop = connect(mapStateToProps, {
  confirmExchange,
  hideModal,
  resetExchangeProcess,
})(ConfirmExchangeModal);
