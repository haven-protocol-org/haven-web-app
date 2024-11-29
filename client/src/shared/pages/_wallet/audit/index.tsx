// Library Imports
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Ticker } from "shared/reducers/types";
import { walletProxy } from "shared/core/proxy";
import { HavenAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import { useNavigate } from "react-router";
import { XBalances } from "shared/reducers/xBalance";
import { bigIntegerToBigInt, convertBalanceToMoney } from "utility/utility";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { Description, Title } from "assets/styles/type";
import { getForkHeights } from "constants/env"


// Relative Imports
import Body from "../../../components/_layout/body";
import Footer from "../../../components/_inputs/footer";
import { AssetRow, AssetContainer, AssetKey, AssetValue, Row, Button } from "./styles";
import bigInt from "big-integer";
import { Warning, Success, Hint } from "shared/components/status";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { createAudit, resetAuditProcess } from "shared/actions/audit";
import { MoneroTxPriority } from "haven-wallet-core";
import { selectTransferListByTicker } from "shared/reducers/xTransferList";
import { TxEntry } from "shared/components/tx-history/container";
import { getAllTransfers } from "shared/actions/transferHistory";
import MoneroIncomingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroIncomingTransfer";
import MoneroOutgoingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroOutgoingTransfer";

interface AuditProps {
  balances: XBalances;
  height: number;
  transfers: MoneroTxWallet[];
  navigate: (path: string) => void;
  resetAuditProcess: () => void;
  createAudit: (keep_subaddress: boolean, priority: number, relay: boolean) => Promise<void>;
  getAllTransfers:() => void;
}

interface AuditState {
  isProcessing: boolean;
}

const Enabled_TICKER = [
  Ticker.XHV,
  Ticker.xUSD,
  Ticker.XAG,
  Ticker.XAU,
  Ticker.xCNY,
  Ticker.xEUR,
  Ticker.xBTC,
  Ticker.xAUD,
  Ticker.xGBP,
  Ticker.xCHF
];

export class Audit extends Component<AuditProps, AuditState> {
  state: AuditState = {
    isProcessing: false,
  };

  componentDidMount() {
    this.props.getAllTransfers();
  }

  runAudit = async () => {
    if (this.state.isProcessing) { return; }
    this.setState({ isProcessing: true });
    await this.props.createAudit(true, MoneroTxPriority.NORMAL, false);
    this.setState({ isProcessing: false });
  };

  getBalances = (audited: boolean) => {
    const balances = new Map<Ticker, bigInt.BigInteger>();

    Enabled_TICKER.forEach((ticker) => {
      const unauditedBalance = this.props.balances[ticker].unauditedBalance;
      const balance = audited ? this.props.balances[ticker].balance.subtract(unauditedBalance) : unauditedBalance;

      if (balance.gt(bigInt.zero)) {
        balances.set(ticker, balance);
       }
    });

    return balances;
  };

  getPostAuditBalances = () => {
    const balances = new Map<Ticker, bigInt.BigInteger>();

    Enabled_TICKER.forEach((ticker) => {
      const balance = this.props.balances[ticker].balance;
      if (balance.gt(bigInt.zero)) {
        balances.set(ticker, balance);
       }
    });

    return balances;
  };

  renderBalances = (balances: Map<Ticker, bigInt.BigInteger>) => {
    let balanceList: JSX.Element[] = [];

    balances.forEach((balance, ticker) => {
      const balanceStr = balance.toString();

      balanceList.push(
        <AssetRow>
            <AssetKey>{ticker}</AssetKey>
            <AssetValue>{balanceStr}</AssetValue>
        </AssetRow>
      );
    });
    return balanceList;
  };

  render() {
    const auditActive = (this.props.height < getForkHeights().HF_VERSION_SUPPLY_AUDIT_END);

    const lockedWarning = Object.entries(this.props.balances).some((entry) => {
      return entry[1].lockedUnauditedBalance.gt(0);
    });

    const unauditedBalances = this.getBalances(false);
    const auditedBalances = this.getBalances(true);
    const postAuditBalances = this.getPostAuditBalances();

    // this isn't actually just auditTxs, so warn users against making outgoing transfers
    const pendingOutgoing = this.props.transfers.filter((tx: MoneroTxWallet) => {
        return tx.isOutgoing() && tx.inTxPool();
      }
    );

    let pendingBalances = new Map<Ticker, bigInt.BigInteger>();
    Object.values(Ticker).forEach((ticker: Ticker) => {
      pendingBalances.set(ticker, bigInt.zero);
    });
    pendingOutgoing.forEach((tx) => {
      const outgoing: MoneroOutgoingTransfer = tx.getOutgoingTransfer();
      const currency: string = outgoing.getCurrency().toUpperCase();
      const ticker: Ticker = currency as Ticker;
      const tmp: bigInt.BigInteger =  pendingBalances.get(ticker) ?? bigInt.zero;
      pendingBalances.set(ticker, tmp.add(bigIntegerToBigInt(tx.getOutgoingAmount())));
    });

    /*pendingBalances.forEach((value, key, map) => {
      if (value.eq(bigInt.zero)) {
       map.delete(key)
      }
    });*/

    if (auditActive) {
      return (
        <Body>
          {lockedWarning && unauditedBalances.size > 0 && <Warning message="Some outputs are locked and cannot be audited."/>}
          <Row>
            <Title>Audit</Title>
            <Description>Haven Protocol is conducting a supply audit. You <strong>must</strong> audit your funds before <strong>2nd Jan 2025</strong> at block <strong>1783950</strong> or they will be lost <strong>forever</strong>.</Description>
          </Row>
          {(unauditedBalances.size > 0 &&
            <>
              <Row>
                <Title>Unaudited Assets</Title>
              </Row>
              <Row>
                <AssetContainer>
                  {this.renderBalances(unauditedBalances)}
                </AssetContainer>
              </Row>
              <Row>
                <Footer
                  label={"Audit Funds"}
                  disabled={false}
                  loading={this.state.isProcessing}
                  onClick={this.runAudit}
                />
              </Row>
            </>) || <Success message="There are no unaudited funds in this wallet."/>
          }
          {auditedBalances.size > 0 &&
            <>
              <Row>
                <Title>Audited Assets</Title>
              </Row>
              <Row>
                <AssetContainer>
                  {this.renderBalances(auditedBalances)}
                </AssetContainer>
              </Row>
            </>
          }
          {pendingBalances.size > 0 &&
            <>
              <Row>
                <Title>Pending Balances</Title>
                <Description>Values below are listed for <strong>convenience only</strong> and should be ignored if you have recently submitted a transaction manually.</Description>
              </Row>
              <Row>
                <AssetContainer>
                  {this.renderBalances(pendingBalances)}
                </AssetContainer>
              </Row>
            </>
          }
        </Body>
      );
    } else {
      return (
        <Body>
          <Row>
            <Title>Audit</Title>
            <Description>The Haven Protocol supply audit is now <strong>finished</strong>. Any funds that were not audited before <strong>2nd Jan 2025</strong> at block <strong>1783950</strong> have been lost <strong>forever</strong>.</Description>
          </Row>
          <Row>
            <Title>Audited Assets</Title>
          </Row>
          {postAuditBalances.size > 0 &&
            <Row>
              <AssetContainer>
                {this.renderBalances(postAuditBalances)}
              </AssetContainer>
            </Row>
            || <Description>No assets in this wallet survived the audit.</Description>
          }
        </Body>
      );
    }
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  balances: state.xBalance,
  height: state.chain.nodeHeight,
  transfers: state.xTransferList
});

const ConnectedAuditPage = connect(mapStateToProps, {
  resetAuditProcess,
  createAudit,
  getAllTransfers
})(Audit);

export const AuditPage = () => {
  const navigate = useNavigate();
  return <ConnectedAuditPage navigate={navigate} />
}