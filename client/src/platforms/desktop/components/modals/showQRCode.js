import React from "react";
import { Modal } from "shared/components/modal";
import { hideModal } from "shared/actions/modal";
import QrCode from "../../../../shared/components/qrCode/index.js";

class ShowQRCodeModal extends React {
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
        />
        <QrCode address={"adddress_goes_here"} />
      </>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

export default ShowQRCodeModal;
