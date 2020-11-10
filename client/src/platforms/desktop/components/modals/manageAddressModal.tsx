import CreateSeed from "../../../../shared/components/_create/create_seed/index.js";
import { hideModal } from "shared/actions/modal";
import * as React from "react";
import { Modal } from "shared/components/modal";
import ManageAddresses from "shared/components/modal_children/manage_addresses";
import Input from "shared/components/_inputs/input";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { connect } from "react-redux";
import { createAddress } from "shared/actions/address";
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
          title="Manage Address"
          description="Name your vault addresses for easier recognition"
          onConfirm={() => this.onConfirm()}
          onCancel={() => this.onCancel()}
          leftButton="Cancel"
          rightButton="Save"
          isLoading={false}
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
            <CreateSeed
              label="Address"
              value={createdAddressEntry ? createdAddressEntry.address : ""}
              rows={4}
              readOnly={true}
            />
          </ManageAddresses>
        </Modal>
      </>
    );
  }

  onCancel() {
    this.props.hideModal();
  }

  onConfirm() {
    this.props.createAddress(this.state.manageName);
  }
}

// <Confirm
//   checked={this.state.checked}
//   onChange={this.handleCheck}
//   label="I accept and agree"
//   description={`I understand that I cannot recieve funds to my Address Name only the Full Address and any funds recieved to the Address Name will be lost.`}
// />

const mapStateToProps = (state: HavenAppState) => ({
  transfer: state.transferProcess,
  countOfAddresses: selectAddressCount(state),
  addresses: state.address,
});

export const ManageAddressModal = connect(mapStateToProps, {
  hideModal,
  createAddress,
})(ManageAddress);
