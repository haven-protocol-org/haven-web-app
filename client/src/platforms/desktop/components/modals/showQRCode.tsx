import * as React from "react";
import { Modal } from "shared/components/modal";
import QrCode from "../../../../shared/components/qrCode/index.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { hideModal } from "shared/actions/modal";
import { selectPrimaryAddress } from "shared/reducers/address";

class ShowQRCodeModal extends React.Component<any, any> {
  render() {
    const { addresses, selected } = this.props;

    return (
      <Modal
        title="QR Code"
        description={`Scan and share your  address`}
        leftButton="Cancel"
        rightButton="Finish"
        disabled={false}
        isLoading={false}
        onConfirm={() => this.onCancel()}
        onCancel={() => this.onCancel()}
      >
        <QrCode address={addresses[selected].address} />
      </Modal>
    );
  }

  onCancel() {
    this.props.hideModal();
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  selected: state.address.selected,
  addresses: state.address.entrys,
});

export const QRCodeModal = connect(mapStateToProps, { hideModal })(
  ShowQRCodeModal
);
