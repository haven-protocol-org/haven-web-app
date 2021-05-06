// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Auth,
  NoAuth,
  Icon,
  Menu,
  Options,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
  Arr,
  Scan,
  Results,
  SearchInput,
  Arrow,
  SearchDropdown,
  AssetLabel,
  TickerLabel,
  EmptyLabel,
  SearchCell,
  Row,
  TokenLabel,
  Column,
} from "./styles.js";
import Buttons from "./buttons/index.js";
import { syncFromFirstIncomingTx, rescanSpent } from "shared/actions/refresh";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";
import { selectSyncState } from "shared/reducers/chain";
import { SyncState } from "shared/types/types.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import Cell from "./cell";
import Link from "./link";
import Tab from "./tab";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { closeWallet } from "shared/actions/walletSession";
import { AssetList } from "../../../../constants/assets";
import { XBalances } from "shared/reducers/xBalance";
import { convertBalanceToMoney } from "utility/utility";

interface NavigationProps {
  isLoggedIn: boolean;
  auth: boolean;
  logout: (isWeb: boolean) => void;
  getStoredWallets: () => void;
  syncFromFirstIncomingTx: () => void;
  rescanSpent: () => void;
  isClosingSession: boolean;
  syncState: SyncState;
  basicActive: boolean;
  advancedActive: boolean;
  restoreHeight: number;
  startedResync: boolean;
  search: string;
  balances: XBalances;
  showModal: (modalType: MODAL_TYPE) => void;
}

class Navigation extends Component<NavigationProps, {}> {
  state = {
    showOptions: false,
    showSearch: false,
    showNotifications: false,
    mouseIsHovering: false,
    basicActive: true,
    advancedActive: false,
    startedResync: false,
    search: "",
  };

  handleLogout = () => {
    this.props.logout(true);
  };

  handleRefreshRequest = (event: any) => {
    this.props.syncFromFirstIncomingTx();
  };

  showDropdownMenu = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ showOptions: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    if (!this.state.mouseIsHovering) {
      this.setState({ showOptions: false }, () => {
        document.removeEventListener("click", this.hideDropdownMenu);
      });
    }
  };

  showSearchDropdownMenu = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ showSearch: true }, () => {
      document.addEventListener("click", this.hideSearchDropdownMenu);
    });
  };

  hideSearchDropdownMenu = () => {
    if (!this.state.mouseIsHovering) {
      this.setState({ showSearch: false, search: "" }, () => {
        document.removeEventListener("click", this.hideSearchDropdownMenu);
      });
    }
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  searchAssets = () => {
    const { search } = this.state;

    return AssetList.filter((value) => {
      if (search === "") {
        return value;
      } else if (
        value.token.toLowerCase().includes(search.toLowerCase()) ||
        value.id.toLowerCase().includes(search.toLowerCase())
      ) {
        return value;
      } else {
        return null;
      }
    }).map((value, key) => {
      const { id, token } = value;

      return (
        <SearchCell to={`/wallet/assets/${id}`} key={key}>
          <Column>
            <TokenLabel>{token}</TokenLabel>
            <TickerLabel>Avail Balance:</TickerLabel>
          </Column>
          <Column>
            <AssetLabel right>{id}</AssetLabel>
            <TickerLabel right>
              {convertBalanceToMoney(this.props.balances[id].balance)}
            </TickerLabel>
          </Column>
        </SearchCell>
      );
    });
  };

  handleMouseEnter = () => {
    this.setState({
      mouseIsHovering: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      mouseIsHovering: false,
    });
  };

  selectBasic = () => {
    this.setState({
      basicActive: true,
      advancedActive: false,
    });
  };

  selectAdvanced = () => {
    this.setState({
      basicActive: false,
      advancedActive: true,
    });
  };

  refreshVault = () => {
    this.props.showModal(MODAL_TYPE.RescanBC);
  };

  render() {
    const auth = this.props.isLoggedIn;
    // @ts-ignore
    const { connected } = this.props;
    const { blockHeight, scannedHeight, isSyncing } = this.props.syncState;
    const networkLabel = `${NET_TYPE_NAME}  v${APP_VERSION}`;
    const { showSearch } = this.state;

    return (
      <Container>
        {auth ? (
          <Auth to={"/wallet/assets"}>
            <Icon />
            <Haven>HAVEN</Haven>
          </Auth>
        ) : (
          <NoAuth href="https://havenprotocol.org" target="_blank">
            <Icon />
            <Haven>HAVEN</Haven>
          </NoAuth>
        )}

        <Menu>
          {auth && (
            <SearchDropdown>
              <SearchInput
                // @ts-ignore
                type="text"
                placeholder="Search assets..."
                name="search"
                value={this.state.search}
                onChange={this.handleChange}
                onClick={
                  showSearch
                    ? this.hideSearchDropdownMenu
                    : this.showSearchDropdownMenu
                }
              />
              <Results showSearch={showSearch}>
                {this.searchAssets()}
                <>
                  <SearchCell to={`/wallet/assets`} key={"na"}>
                    <EmptyLabel>No more assets</EmptyLabel>
                  </SearchCell>
                </>
              </Results>
            </SearchDropdown>
          )}
          <Buttons
            isLoading={this.props.isClosingSession}
            auth={this.props.isLoggedIn}
            onClick={this.handleLogout}
          />
          <Options
            onClick={
              this.state.showOptions
                ? this.hideDropdownMenu
                : this.showDropdownMenu
            }
          >
            <OptionsIcon>
              <OptionsSVG />
            </OptionsIcon>
          </Options>
        </Menu>
        {this.state.showOptions && (
          <>
            <OptionsList
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <Arrow>
                <Arr />
              </Arrow>
              {!auth && (
                <>
                  <Cell body="Network" label={networkLabel} />
                  <Link
                    body="Help"
                    label="Knowledge Base"
                    url={`https://havenprotocol.org/knowledge`}
                  />
                  <Link
                    body="Legal"
                    label="Terms"
                    url={`https://havenprotocol.org/legal`}
                  />
                </>
              )}
              {auth && (
                <>
                  <Tab
                    basicActive={this.state.basicActive}
                    basicSelect={this.selectBasic}
                    advancedSelect={this.selectAdvanced}
                    advancedActive={this.state.advancedActive}
                  />

                  {this.state.basicActive ? (
                    <>
                      <Cell body="Network" label={networkLabel} />
                      {!isSyncing ? (
                        <>
                          <Cell body="Vault Status" label="Synced" />
                        </>
                      ) : (
                        <Cell
                          body="Sync Status"
                          label={scannedHeight + "/" + blockHeight}
                        />
                      )}
                      <Link
                        body="Help"
                        label="Knowledge Base"
                        url={`https://havenprotocol.org/knowledge`}
                      />
                      <Link
                        body="Legal"
                        label="Terms"
                        url={`https://havenprotocol.org/legal`}
                      />
                    </>
                  ) : (
                    <>
                      <Cell
                        body="Vault Connected"
                        label={connected ? "Yes" : "No"}
                      />
                      <Cell body="Block Height" label={blockHeight} />
                      <Cell
                        body="Refresh Height"
                        label={this.props.restoreHeight}
                      />
                      <Scan onClick={this.refreshVault}>Refresh Vault</Scan>
                    </>
                  )}
                </>
              )}
            </OptionsList>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: WebAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  syncState: selectSyncState(state as HavenAppState),
  connected: state.connectedNode.isWalletConectedToDaemon,
  isClosingSession: state.walletSession.isClosingSession,
  restoreHeight: state.walletSession.restoreHeight,
  balances: state.xBalance,
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
  syncFromFirstIncomingTx,
  rescanSpent,
  showModal,
})(Navigation);
