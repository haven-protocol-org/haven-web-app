import Header from "../../../../pages/_wallet/details";
import {EmptyState, History, Message, NoTransactions} from "../../../../pages/_wallet/details/styles";
import {Spinner} from "../../../../components/spinner";
import {convertBalanceForReading} from "../../../../utility";
import empty from "../../../../assets/illustration/no_transactions.svg";
import React, {Component} from "react";
import {selectBlockchainHeight} from "../../../../reducers/chain";
import {getSimplePrice, getTransfers} from "../../../../actions";
import {connect} from "react-redux";
import {core} from "../../../../declarations/open_monero.service";
import {Transaction} from "../../../../components/_transactions/transfer";


class TxHistoryContainer extends Component {


    getTransactionType(tx) {
        if (tx.coinbase) {
            return "Mined";
        } else if (tx.approx_float_amount > 0) {
            return "Received";
        } else if (tx.approx_float_amount < 0) {
            return "Sent";
        } else {
            return null;
        }
    }

    getTransactionStatus(tx) {

        if (tx.mempool || tx.height > this.props.height - core.monero_config.txMinConfirms)
        {
            return "pending";
        } else {
            return "completed";
        }
    }



render () {

    const { id } = this.props.match.params;
    const { txs, isFetching } = this.props.transferList;



    return (
        <>
        <Header
            title="History"
            description={`Review your ${id} transaction history`}
        />
    {isFetching && txs == null ? (
        <EmptyState>
            <Spinner />
            <Message>Loading transaction history...</Message>
        </EmptyState>
    ) : (
        <History>
            {txs && txs.length > 0 ? (
                txs.map((transaction, index) => {
                    return (
                        <Transaction
                            key={index}
                            bHeight={this.props.height}
                            type={this.getTransactionType(transaction)}
                            status={this.getTransactionStatus(transaction)}
                            price={this.props.price}
                            block={transaction.height}
                            date={new Date(
                                transaction.timestamp
                            ).toLocaleDateString()}
                            tx={transaction.hash}
                            memPool={transaction.mempool}
                            amount={convertBalanceForReading(
                                Math.abs(transaction.amount)
                            )}
                        />
                    );
                })
            ) : (
                <EmptyState>
                    <NoTransactions src={empty} />
                    <Message>
                        No transactions found. Once you send, receive or exchange
                        tokens your transactions will appear here.
                    </Message>
                </EmptyState>
            )}
        </History>
    )}
    </>
    )

}
}


export const mapStateToProps = state => ({
    transferList: state.transferList,
    height: selectBlockchainHeight(state),
    price: getSimplePrice(state)
});

export const TxHistoryWeb =  connect(
    mapStateToProps,
    { getTransfers }
)(TxHistoryContainer);
