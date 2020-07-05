import * as React from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import {
  confirmExchange,
  resetExchangeProcess
} from "platforms/desktop/actions";
import { Modal } from "shared/components/modal";
import { ExchangeProcessInfo } from "platforms/desktop/reducers/exchangeProcess";
import { hideModal } from "shared/actions/modal";
import Transaction from "shared/components/_transactions/exchange";

interface ConfirmExchangeModalProps {
  exchange: ExchangeProcessInfo;
  confirmExchange: (hex: string) => void;
  resetExchangeProcess: () => void;
  hideModal: () => void;
}

class ConfirmExchangeModal extends React.Component<
  ConfirmExchangeModalProps,
  any
> {
  render() {
    const {
      address,
      fromAmount,
      toAmount,
      fromTicker,
      toTicker, fee
    } = this.props.exchange;

    return (
      <Modal
        title="Exchange Confirmation"
        description="Please confirm and finalize your exchange transaction"
        leftButton="Cancel"
        rightButton="Confirm"
        onCancel={() => this.onCancel()}
        onConfirm={() => this.onConfirm()}
        disabled={false}
      >
        <Transaction
          xRate={1}
          fromAmount={fromAmount}
          toAmount={toAmount}
          fromTicker={fromTicker}
          toTicker={toTicker}
          fee={fee}
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
    const { metaData } = this.props.exchange;
    this.props.confirmExchange(metaData);
  }

  componentDidUpdate(prevProps: Readonly<ConfirmExchangeModalProps>): void {
    if (this.props.exchange.created === false) {
      this.props.hideModal();
    }
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  exchange: state.exchangeProcess
});

export const ConfirmExchangeModalDesktop = connect(
  mapStateToProps,
  { confirmExchange, hideModal, resetExchangeProcess }
)(ConfirmExchangeModal);
