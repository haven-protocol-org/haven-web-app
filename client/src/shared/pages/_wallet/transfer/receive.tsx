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
import { selectAddressByIndex } from "../../../reducers/address";

interface OwnAddressState {
  selected: AddressEntry;
  copyButtonState: string;
  secondTabLabel: string;
  index: number;
}

interface OwnAddressProps {
  addresses: AddressEntry[];
  showModal: (modalType: MODAL_TYPE) => void;
}

class OwnAddressContainer extends Component<OwnAddressProps, OwnAddressState> {
  private addressValue: any = React.createRef();

  state: OwnAddressState = {
    selected: this.props.addresses[0],
    copyButtonState: "Copy",
    secondTabLabel: "",
    index: 0,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectAddress = (selected: AddressEntry) => {
    console.log("INDEX", selected.index);

    this.setState({
      selected,
      index: selected.index,
    });

    selectAddressByIndex(this.props.addresses, selected.index);
  };

  clipboardAddress = () => {
    const { address } = this.state.selected;

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

    return (
      <Fragment>
        <Form>
          <AddressDropdown
            label="Select Vault"
            readOnly={true}
            value={this.props.addresses[this.state.index].label}
            options={this.props.addresses}
            onClick={this.selectAddress}
            editable={true}
            editAddress={this.showAddressModal}
          />
          {windowWidth < 1380 ? (
            <Description
              label="Selected Vault Address"
              width={true}
              value={this.state.selected.address}
              readOnly={true}
              rows={windowWidth < 600 ? "3" : "2"}
            />
          ) : (
            <Input
              ref={(textarea) => (this.addressValue = textarea)}
              label="Selected Vault Address"
              placeholder="Select an address"
              width={true}
              type={"text"}
              name="address"
              value={this.state.selected.address}
              readOnly={true}
            />
          )}
        </Form>
        <Container>
          <DoubleFooter
            leftLabel={"Show QR"}
            leftDisabled={false}
            leftLoading={false}
            leftOnClick={this.showQRCodeModal}
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
  showModal,
});

export const OwnAddress = connect(mapStateToProps, {
  showModal,
})(OwnAddressContainer);
