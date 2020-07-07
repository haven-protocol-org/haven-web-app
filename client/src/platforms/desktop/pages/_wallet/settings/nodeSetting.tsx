import Nodes from "shared/components/_inputs/nodes";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Input from "shared/components/_inputs/input";
import { Container } from "./styles";

import Footer from "shared/components/_inputs/footer/index.js";
import DoubleFooter from "shared/components/_inputs/double_footer/index.js";
import React, { SyntheticEvent } from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { selectisLocalNode } from "platforms/desktop/reducers/havenNode";
import { setHavenNode } from "platforms/desktop/actions/havenNode";
import { NodeLocation, NodeState } from "platforms/desktop/types";
import { REMOTE_NODES } from "platforms/desktop/nodes";
import { selectIsWalletSyncingRemote } from "platforms/desktop/reducers/walletRPC";

enum NodeSelectionType {
  local,
  remote,
  custom,
}

export interface NodeOption {
  name: string;
  location: NodeLocation;
  address: string;
  port: string;
  selectionType: NodeSelectionType;
}

export interface NodeSettingProps {
  isRemoteSyncing: boolean;
  localNode: boolean;
  node: NodeState;
  nodeOptions: NodeOption[];
  setHavenNode: (
    selectedNodeOption: NodeOption,
    address: string,
    port: string
  ) => void;
}

export interface NodeSettingState {
  selectedNodeOption: NodeOption;
  address: string;
  port: string;
  connected: boolean;
}

class NodeSettingComponent extends React.Component<
  NodeSettingProps,
  NodeSettingState
> {
  state = {
    address: this.props.node.address,
    connected: false,
    selectedNodeOption: this.props.nodeOptions.find(
      (nodeOption) => nodeOption.address === this.props.node.address
    )!,
    port: this.props.node.port,
  };

  componentDidMount() {
    this.setState({
      connected: true,
    });
  }

  onConnect = (e: SyntheticEvent) => {
    e.preventDefault();

    this.setState({
      connected: true,
    });

    const { address, selectedNodeOption, port } = this.state;

    if (address === this.props.node.address && port === this.props.node.port) {
      return;
    }

    this.props.setHavenNode(selectedNodeOption, address, port);
  };

  selectLocation = (option: NodeOption) => {
    this.setState({
      selectedNodeOption: option,
      address: option.address,
      port: option.port,
    });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  onDisconnect = () => {
    this.setState({
      connected: false,
    });
  };

  render() {
    const selectedNodeOption = this.state.selectedNodeOption;

    const { isRemoteSyncing } = this.props;
    const { connected } = this.state;

    // @marty
    // Currenty, the componentDidMount sets connected to 'true'
    // This assumes the node connects by default
    // When the user clicks "Connect" or "Change" the state is reset
    // If the state connected=true
    // The "Connect" button is disabled
    // The Change button is enabled
    // The form is disabled
    // This is to ensure that the use has to manually change nodes
    // I need you to pass the logic in for the connected state so its not hardcoded
    // The navigation has most of the logic we need in the button
    // Lastly the "Connect" button should spin while connecting to a node

    return (
      <>
        <Header
          title="Nodes"
          description="Choose between running a local or remote node"
        />
        <Form onSubmit={this.onConnect}>
          <Nodes
            label={"Select Node"}
            placeholder="Select Node"
            name="node"
            value={this.state.selectedNodeOption.name}
            options={this.props.nodeOptions}
            onClick={this.selectLocation}
            disabled={this.state.connected}
          />
          {selectedNodeOption.selectionType === NodeSelectionType.custom && (
            <>
              <Input
                label="Node Address"
                placeholder="Enter node address"
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <Input
                label="Node Port"
                placeholder="Enter port number"
                type="text"
                name="port"
                value={this.state.port}
                onChange={this.handleChange}
              />
            </>
          )}
          <Container>
            <DoubleFooter
              // Left section
              onClick={() => {}}
              leftLabel={"Change"}
              leftDisabled={!connected}
              leftOnClick={this.onDisconnect}
              leftLoading={false}
              // Right section
              rightOnClick={this.onConnect}
              rightDisabled={connected}
              rightLoading={isRemoteSyncing}
              rightLabel={isRemoteSyncing === true ? "Syncing..." : "Connect"}
            />
          </Container>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  node: state.havenNode,
  isRemoteSyncing: selectIsWalletSyncingRemote(state),
  localNode: selectisLocalNode(state.havenNode),
  nodeOptions: createNodeOptions(state.havenNode),
});

export const HavenNodeSetting = connect(mapStateToProps, {
  setHavenNode,
})(NodeSettingComponent);

const createNodeOptions = (havendState: NodeState): NodeOption[] => {
  const remoteNodes: NodeOption[] = REMOTE_NODES.map((node) => {
    const host = new URL(node.address).host;
    return {
      location: NodeLocation.Remote,
      address: node.address,
      port: node.port,
      name: `Remote Node ( ${host} )`,
      selectionType: NodeSelectionType.local,
    };
  });

  const localNode: NodeOption = {
    location: NodeLocation.Local,
    address: "",
    port: "",
    name: "Local Node",
    selectionType: NodeSelectionType.local,
  };

  const customNode: NodeOption = isCustomNode(havendState)
    ? {
        location: NodeLocation.Remote,
        address: havendState.address,
        port: havendState.port,
        name: createCustomNodeName(havendState),
        selectionType: NodeSelectionType.custom,
      }
    : {
        location: NodeLocation.Remote,
        address: "",
        port: "",
        name: "Custom Node",
        selectionType: NodeSelectionType.custom,
      };

  return [localNode, ...remoteNodes, customNode];
};

const createCustomNodeName = (havendState: NodeState) => {
  try {
    return `Custom Node ( ${new URL(havendState.address).host} )`;
  } catch (e) {
    return "Custom Node";
  }
};

const isCustomNode = (havendState: NodeState): boolean => {
  return (
    havendState.location === NodeLocation.Remote &&
    !REMOTE_NODES.some(
      (remoteNode) => remoteNode.address === havendState.address
    )
  );
};
