import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AddressDropdown from "../../../components/_inputs/addresses_dropdown/index.js";
import Description from "../../../components/_inputs/description";
import DoubleFooter from "../../../components/_inputs/double_footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
import { Container } from "./styles";
import { DesktopAppState } from "platforms/desktop/reducers";
import { AddressEntry } from "shared/reducers/address";
import { writeText } from "vendor/clipboard/clipboard-polyfill";
import { showModal } from "../../../actions/modal";
import { MODAL_TYPE } from "../../../reducers/modal";
import { selectSelectedAddress } from "../../../reducers/address";
import { setSelectedAddress } from "shared/actions/address";

interface OwnAddressState {
  copyButtonState: string;
  secondTabLabel: string;
}

interface OwnAddressProps {
  addresses: AddressEntry[];
  showModal: (modalType: MODAL_TYPE) => void;
  setSelectedAddress: (addressIndex: number) => void;
  selected: AddressEntry | undefined;
}

class OwnAddressContainer extends Component<OwnAddressProps, OwnAddressState> {
  private addressValue: any = React.createRef();

  state: OwnAddressState = {
    copyButtonState: "Copy",
    secondTabLabel: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectAddress = (selected: AddressEntry) => {
    this.props.setSelectedAddress(selected.index);
  };

  clipboardAddress = () => {
    const { address } = this.props.selected!;

    this.setState({
      copyButtonState: "Copied...",
    });

    writeText(address);

    setTimeout(() => {
      this.setState({
        copyButtonState: "Copy",
      });
    }, 1000);
  };

  showQRCodeModal = () => {
    this.props.showModal(MODAL_TYPE.ShowQRCode);
  };

  showAddressModal = () => {
    this.props.showModal(MODAL_TYPE.ShowAddressModal);
  };

  render() {
    const windowWidth = window.innerWidth;

    if (this.props.addresses.length === 0) {
      return null;
    }

    const { selected, addresses } = this.props;

    const handleLabel =
      selected!.label === undefined
        ? `Address ${selected!.index}`
        : selected!.label;

    return (
      <Fragment>
        <Form>
          <AddressDropdown
            label="Select or Create Address"
            readOnly={true}
            value={handleLabel}
            options={addresses}
            onClick={this.selectAddress}
            editable={true}
            editAddress={this.showAddressModal}
          />
          {windowWidth < 1380 ? (
            <Description
              label={`Address (${handleLabel})`}
              width={true}
              value={selected!.address}
              readOnly={true}
              rows={windowWidth < 600 ? "3" : "2"}
            />
          ) : (
            <Input
              ref={(textarea) => (this.addressValue = textarea)}
              label={`Address (${handleLabel})`}
              placeholder="Select an address"
              width={true}
              type={"text"}
              name="address"
              value={selected!.address}
              readOnly={true}
            />
          )}
        </Form>
        <Container>
          <DoubleFooter
            // Left Section
            leftLabel={"Show QR"}
            leftDisabled={false}
            leftLoading={false}
            leftOnClick={this.showQRCodeModal}
            leftVisible={true}
            // Right Section
            rightLabel={this.state.copyButtonState}
            rightDisabled={false}
            rightLoading={false}
            rightOnClick={this.clipboardAddress}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  selected: selectSelectedAddress(state),
  addresses: state.address.entrys,
});

export const OwnAddress = connect(mapStateToProps, {
  showModal,
  setSelectedAddress,
})(OwnAddressContainer);
