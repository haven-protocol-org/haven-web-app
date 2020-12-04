import * as React from "react";
import { connect } from "react-redux";
import { confirmExchange, resetExchangeProcess } from "shared/actions/exchange";
import { Modal } from "shared/components/modal";
import { ExchangeProcessInfo } from "shared/reducers/exchangeProcess";
import { hideModal } from "shared/actions/modal";
import Transaction from "shared/components/_transactions/exchange";
import { convertBalanceToMoney } from "utility/utility";
import { selectPrimaryAddress } from "shared/reducers/address";
import { HavenAppState } from "platforms/desktop/reducers";

interface ConfirmExchangeModalProps {
  exchange: ExchangeProcessInfo;
  confirmExchange: (metaList: Array<string>) => void;
  resetExchangeProcess: () => void;
  hideModal: () => void;
  isOwnAddress: boolean;
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
      fee,
      priority,
    } = this.props.exchange;

    const isOwnAddress = this.props.isOwnAddress;

    const readableToAmout = convertBalanceToMoney(toAmount!);
    const readAbleFromAmount = convertBalanceToMoney(fromAmount!);
    const readAbleFeeAmount = convertBalanceToMoney(fee!);

    return (
      <Modal
        title="Conversion Confirmation"
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
          priority={priority}
          onChange={this.approveTransfer}
          fromAmount={readAbleFromAmount}
          checked={this.state.checked}
          toAmount={readableToAmout}
          fromTicker={fromTicker}
          toTicker={toTicker}
          fee={readAbleFeeAmount}
          externAddress={address}
          isOwnAddress={isOwnAddress}
        />
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
    // this.props.resetExchangeProcess();
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

const mapStateToProps = (state: HavenAppState) => ({
  exchange: state.exchangeProcess,
  isOwnAddress:
    selectPrimaryAddress(state.address.entrys) ===
    state.exchangeProcess.address,
});

export const ConfirmExchangeModalDesktop = connect(mapStateToProps, {
  confirmExchange,
  hideModal,
  resetExchangeProcess,
})(ConfirmExchangeModal);
