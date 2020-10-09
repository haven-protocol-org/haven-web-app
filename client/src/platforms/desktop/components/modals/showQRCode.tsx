import * as React from "react";
import { Modal } from "shared/components/modal";
import QrCode from "../../../../shared/components/qrCode/index.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import { selectPrimaryAddress } from "shared/reducers/address.js";

class ShowQRCodeModal extends React.Component<any, any> {
  render() {
    return (
      <>
        <Modal
          title="QR Code"
          description="Share your QR Code"
          leftButton="Cancel"
          rightButton="Confirm"
          onConfirm={() => this.onCancel()}
          onCancel={() => this.onCancel()}
        >
          <QrCode address={this.props.address} />
        </Modal>
      </>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

export default ShowQRCodeModal;

const mapStateToProps = (state: HavenAppState) => ({
  address: selectPrimaryAddress(state.address),
});

export const ConfirmTxModalDesktop = connect(mapStateToProps, { hideModal })(
  ShowQRCodeModal
);
