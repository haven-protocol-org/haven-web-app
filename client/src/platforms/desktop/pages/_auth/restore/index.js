

import {selectErrorMessageForLogin, selectIsLoggedIn, selectIsRequestingLogin} from "../../../reducers/walletSession";
import {connect} from "react-redux";
import {restoreWallet} from "../../../actions";
import Login from "../../../../../universal/pages/_auth/login";
import {Redirect} from "react-router";
import React,{Component} from "react";




class RestoreDesktopContainer extends Component {


    render(){

        if (this.props.isLoggedIn) {
            return <Redirect to="/wallet/assets" />;
        }

        return (

            <Login isRequestingLogin={this.props.isRequestingLogin}
                   errorMessage={this.props.errorMessage} login={this.restoreWalletBySeed}/>
        )
    }


    restoreWalletBySeed = (seed) => {

        const randomNum = parseInt(Math.random() *  100);
        this.props.restoreWallet(seed, 'test' + randomNum, 'test');
    }
}

const mapStateToProps = state => ({
    isRequestingLogin: selectIsRequestingLogin(state),
    isLoggedIn: selectIsLoggedIn(state),
    errorMessage: selectErrorMessageForLogin(state)
});

export const RestoreDesktop =   connect(
    mapStateToProps,
    { restoreWallet }
)(RestoreDesktopContainer);
