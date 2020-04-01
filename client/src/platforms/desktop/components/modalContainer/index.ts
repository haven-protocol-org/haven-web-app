import * as React from "react";
import {DesktopAppState} from "platforms/desktop/reducers";
import {getTransferListByTicker} from "shared/reducers/xTransferList";
import {selectBlockHeight} from "platforms/desktop/reducers/chain";
import {withRouter} from "react-router";
import {connect} from "react-redux";


class ModalContainer extends React.Component<any, any> {





    render() {

        return null;

    }





}



const mapStateToProps = (state: DesktopAppState, props: any) => ({
    transferList: getTransferListByTicker(state, props.match.params.id),
    height: selectBlockHeight(state),
    price: state.simplePrice.price
});

export const ModalContainerDesktop = withRouter(
    connect(mapStateToProps, { getTransfers })(ModalContainer)
);
