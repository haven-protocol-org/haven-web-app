import CreateSeed from "../../../../shared/components/_create/create_seed/index.js";
import { hideModal } from "shared/actions/modal";
import * as React from "react";
import { Modal } from "shared/components/modal";
import ManageAddresses from "shared/components/modal_children/manage_addresses";
import Input from "shared/components/_inputs/input";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { createAddress } from "shared/actions/address";
import { Information } from "../../../../assets/styles/type.js";

import {
  AddressEntry,
  selectAddressByIndex,
  selectAddressCount,
} from "shared/reducers/address";

interface ManageAdressState {
  checked: boolean;
  disabled: boolean;
  manageName: string;
  expectedIndexOfCreatedAddress: number;
  isLoading: boolean;
}

interface ManageAdressProps {
  hideModal: () => void;
  createAddress: (label: string) => void;
  countOfAddresses: number;
  addresses: AddressEntry[];
}

export class ManageAddress extends React.Component<
  ManageAdressProps,
  ManageAdressState
> {
  state: ManageAdressState = {
    manageName: "",
    disabled: false,
    checked: false,
    isLoading: false,
    expectedIndexOfCreatedAddress: this.props.countOfAddresses,
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({ [name]: value });
  };

  handleCheck: any;

  render() {
    const createdAddressEntry = selectAddressByIndex(
      this.props.addresses,
      this.state.expectedIndexOfCreatedAddress
    );

    return (
      <>
        <Modal
          title="Create Address"
          description="Create and name a new address"
          onConfirm={() => this.onConfirm()}
          onCancel={() => this.onCancel()}
          leftButton="Cancel"
          rightButton="Save"
          isLoading={this.state.isLoading}
          disabled={false}
        >
          <ManageAddresses>
            <Input
              width={true}
              label="Address Name"
              placeholder="Name of address"
              type="text"
              name="manageName"
              value={
                createdAddressEntry
                  ? createdAddressEntry.label
                  : this.state.manageName
              }
              onChange={this.handleChange}
            />
          </ManageAddresses>
          <Information>
            You can create unlimited amounts of addresses. This lets you receive
            assets to multiple addresses within one account, without having to
            create a new vault. This preserves your privacy more than receiving
            all assets to a single address.
          </Information>
        </Modal>
      </>
    );
  }

  onCancel() {
    this.props.hideModal();
  }

  onConfirm() {
    this.props.createAddress(this.state.manageName);
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });

      this.props.hideModal();
    }, 2000);
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  countOfAddresses: selectAddressCount(state),
  addresses: state.address.entrys,
});

export const ManageAddressModal = connect(mapStateToProps, {
  hideModal,
  createAddress,
})(ManageAddress);
