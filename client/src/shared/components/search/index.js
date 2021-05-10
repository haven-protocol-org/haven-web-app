import React, { Component } from "react";
import {
  SearchDropdown,
  SearchArrow,
  SearchArr,
  SearchCell,
  Row,
  Column,
  TokenLabel,
  AssetLabel,
  TickerLabel,
  EmptyLabel,
  SearchInput,
  Results,
} from "./styles";
import { AssetList } from "../../../constants/assets.ts";
import { connect } from "react-redux";
import { convertBalanceToMoney } from "../../../utility/utility.ts";

class Search extends Component {
  state = {
    showSearch: false,
    xasset_lookup: "",
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
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
      this.setState({ showSearch: false, xasset_lookup: "" }, () => {
        document.removeEventListener("click", this.hideSearchDropdownMenu);
      });
    }
  };

  searchAssets = () => {
    const { xasset_lookup } = this.state;

    return AssetList.filter((value) => {
      if (xasset_lookup === "") {
        return value;
      } else if (
        value.token.toLowerCase().includes(xasset_lookup.toLowerCase()) ||
        value.id.toLowerCase().includes(xasset_lookup.toLowerCase())
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
            <TickerLabel>Avail Balance</TickerLabel>
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

  render() {
    const { showSearch, xasset_lookup } = this.state;
    return (
      <SearchDropdown>
        <SearchInput
          // @ts-ignore
          type="text"
          autocomplete="off"
          placeholder="Search assets..."
          name="xasset_lookup"
          value={xasset_lookup}
          onChange={this.handleChange}
          onClick={
            showSearch
              ? this.hideSearchDropdownMenu
              : this.showSearchDropdownMenu
          }
        />
        <>
          <SearchArrow showSearch={showSearch}>
            <SearchArr showSearch={showSearch} />
          </SearchArrow>
          <Results showSearch={showSearch}>
            {this.searchAssets()}
            <>
              <EmptyLabel>No more assets</EmptyLabel>
            </>
          </Results>
        </>
      </SearchDropdown>
    );
  }
}

const mapStateToProps = (state) => ({
  balances: state.xBalance,
});

export default connect(mapStateToProps)(Search);
