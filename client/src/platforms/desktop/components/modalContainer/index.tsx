import * as React from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { ConfirmTxModalDesktop } from "platforms/desktop/components/modals/confirmTxModal";
import { ConfirmExchangeModalDesktop } from "platforms/desktop/components/modals/confirmExchangeModal";
import { QRCodeModal } from "../modals/showQRCode";
import { ManageAddressModal } from "../modals/manageAddressModal";

class ModalContainer extends React.Component<any, any> {
  render() {
    const modalType = this.props.modalType;

    switch (modalType) {
      case MODAL_TYPE.None:
        return null;
      case MODAL_TYPE.ConfirmExchange:
        return <ConfirmExchangeModalDesktop />;
      case MODAL_TYPE.ConfirmTx:
        return <ConfirmTxModalDesktop />;
      case MODAL_TYPE.ShowQRCode:
        return <QRCodeModal />;
      case MODAL_TYPE.ShowAddressModal:
        return <ManageAddressModal />;
    }
    return null;
  }
}

const mapStateToProps = (state: DesktopAppState, props: any) => ({
  modalType: state.modal,
});

export const ModalContainerDesktop = connect(mapStateToProps, { hideModal })(
  ModalContainer
);
