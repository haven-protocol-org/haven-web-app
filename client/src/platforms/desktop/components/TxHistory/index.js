import {EmptyState, History, Message, NoTransactions} from "../../../../universal/pages/_wallet/details/styles";
import {Spinner} from "../../../../universal/components/spinner";
import {convertBalanceForReading} from "../../../../utility/utility";
import empty from "../../../../assets/illustration/no_transactions.svg";
import React, {Component} from "react";
import {getTransfers} from "../../actions";
import {connect} from "react-redux";
import {Transaction} from "../../../../universal/components/transaction";
import Header from "../../../../universal/components/_layout/header/index.js"
import {withRouter} from "react-router-dom";
import {selectHeight} from "../../reducers/chain";


class TxHistoryContainer extends Component {


     getTransactionType(status) {
        if (status === "in") {
            return "Received";
        } else if (status === "out") {
            return "Sent";
        } else if (status === "block") {
            return "Mined";
        } else {
            return null;
        }
    }



render () {

    const assetId = this.props.match.id;
    const { txs, isFetching } = this.props.transferList;


    return (
        <>
        <Header
            title="History"
            description={`Review your ${assetId} transaction history`}
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
                            type={this.getTransactionType(transaction.status)}
                            status={transaction.status}
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
    height: selectHeight(state),
    price: state.simplePrice.price
});

export const TxHistoryDesktop =  withRouter(connect(
    mapStateToProps,
    { getTransfers }
)(TxHistoryContainer));
