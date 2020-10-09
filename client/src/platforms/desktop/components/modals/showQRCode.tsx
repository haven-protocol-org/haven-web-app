import * as React from "react";
import { Modal } from "shared/components/modal";
import QrCode from "../../../../shared/components/qrCode/index.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import { selectPrimaryAddress } from "shared/reducers/address";

class ShowQRCodeModal extends React.Component<any, any> {
  render() {
    return (
      <>
        <Modal
          title="QR Code"
          description="Sharable and scanable address"
          leftButton="Cancel"
          rightButton="Confirm"
          disabled={false}
          isLoading={false}
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

const mapStateToProps = (state: HavenAppState) => ({
  address: selectPrimaryAddress(state.address),
});

export const QRCodeModal = connect(mapStateToProps, { hideModal })(
  ShowQRCodeModal
);
