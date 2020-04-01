import * as React from "react";
import {DesktopAppState} from "platforms/desktop/reducers";
import {connect} from "react-redux";
import {confirmExchange} from "platforms/desktop/actions/exchange";


class ConfirmExchangeModal extends React.Component<any, any> {




    render() {


        return (<Modal>)


    }








}



const mapStateToProps = (state: DesktopAppState) => ({
   process:state.exchangeProcess
});

export const ConfirmExchangeModalDesktop = connect(
    mapStateToProps,
    { confirmExchange }
)(ConfirmExchangeModal);
