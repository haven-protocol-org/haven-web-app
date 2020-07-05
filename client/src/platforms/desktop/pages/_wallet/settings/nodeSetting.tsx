import Nodes from "shared/components/_inputs/nodes";
import Header from "shared/components/_layout/header";
import Form from "shared/components/_inputs/form";
import Input from "shared/components/_inputs/input";
import { Container } from "./styles";

import Footer from "shared/components/_inputs/footer/index.js";
import React, { SyntheticEvent } from "react";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { selectisLocalNode } from "platforms/desktop/reducers/havenNode";
import { setHavenNode } from "platforms/desktop/actions/havenNode";
import { NodeLocation, NodeState } from "platforms/desktop/types";

const nodes: NodeLocation[] = [NodeLocation.Remote, NodeLocation.Local];

export interface NodeSettingProps {
  localNode: boolean;
  node: NodeState;
  setHavenNode: (
    address: string,
    port: string,
    selectedLocation: NodeLocation
  ) => void;
}

export interface NodeSettingState {
  address: string;
  selectedLocation: NodeLocation;
  port: string;
}

class NodeSettingComponent extends React.Component<
  NodeSettingProps,
  NodeSettingState
> {
  state = {
    address: this.props.node.address,
    selectedLocation: this.props.node.location,
    port: this.props.node.port,
  };

  onConnect = (e: SyntheticEvent) => {
    e.preventDefault();

    const { address, selectedLocation, port } = this.state;
    this.props.setHavenNode(address, port, selectedLocation);
  };

  selectLocation = (option: NodeLocation) => {
    this.setState({
      selectedLocation: option,
    });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  render() {
    const localNode = this.state.selectedLocation === NodeLocation.Local;

    return (
      <>
        <Header
          title="Nodes"
          description="Choose between running a local or remote node"
        />
        <Form onSubmit={this.onConnect}>
          <Nodes
            label="Select Node"
            placeholder="Select Node"
            name="node"
            value={this.state.selectedLocation}
            options={nodes}
            onClick={this.selectLocation}
          />
          {!localNode && (
            <>
              <Input
                label="Node Address"
                placeholder="Enter node address"
                type="text"
                name="address"
                value={"http://remote.haven.miner.rocks"}
                onChange={this.handleChange}
              />
              <Input
                label="Node Port"
                placeholder="Enter port number"
                type="text"
                name="port"
                value={"17750"}
                onChange={this.handleChange}
              />
            </>
          )}
          <Container>
            <Footer onClick={this.onConnect} loading={false} label="Connect" />
          </Container>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  node: state.havenNode,
  localNode: selectisLocalNode(state.havenNode),
});

export const HavenNodeSetting = connect(mapStateToProps, {
  setHavenNode,
})(NodeSettingComponent);
