// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import { getForkHeights } from "constants/env"

// Relative Imports
import {
  Container,
  Overview,
  Item,
  Wrapper,
  Icon,
  Chevron,
  Label,
  Aligner,
  Asset,
  Convert,
  Transfer,
  Settings,
  ChevronInactive,
  Audit
} from "./styles";

import { MultiBalance } from "../../multi-balance";

interface AuditProps {
  height: number;
}

class MenuPage extends Component<AuditProps> {
  state = {
    item: "",
  };

  componentDidMount() {
    this.setState({
      item: "assets",
    });
  }

  handleClick = (item: string) => {
    this.setState({
      item: item,
    });
  };
 
  render() {
    const { item } = this.state;
    const height = this.props.height;

    const auditActive = (height < getForkHeights().HF_VERSION_VBS_DISABLING);
 
    return (
      <Container>
        <Overview>
          <MultiBalance />
        </Overview> 
        <Wrapper>
          <Item to="/wallet/assets" onClick={() => this.handleClick("assets")}>
            <Aligner>
              <Asset item={item} />
              <Label>Assets</Label>
            </Aligner>
            {item === "assets" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
        <Wrapper>
          {(auditActive &&
            <Item
              to="/wallet/audit"
              onClick={() => this.handleClick("audit")}
            >
              <Aligner>
                <Audit item={item} />
                <Label>Audit</Label>
              </Aligner>
              {item === "audit" ? <Chevron /> : <ChevronInactive />}
            </Item>)
            ||
              <Item
              to="/wallet/convert"
              onClick={() => this.handleClick("convert")}
            >
              <Aligner>
                <Convert item={item} />
                <Label>Convert</Label>
              </Aligner>
              {item === "convert" ? <Chevron /> : <ChevronInactive />}
            </Item>
          }
        </Wrapper>
        <Wrapper>
          <Item
            to="/wallet/transfer"
            onClick={() => this.handleClick("transfer")}
          >
            <Aligner>
              <Transfer item={item} />
              <Label>Transfer</Label>
            </Aligner>
            {item === "transfer" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
        <Wrapper>
          <Item
            to="/wallet/settings"
            onClick={() => this.handleClick("settings")}
          >
            <Aligner>
              <Settings item={item} />
              <Label>Settings</Label>
            </Aligner>
            {item === "settings" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
      </Container>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  height: state.chain.nodeHeight
});

export const Menu = connect(mapStateToProps, {})(MenuPage);

export default Menu;