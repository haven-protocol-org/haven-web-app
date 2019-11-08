import {selectIsLoggedIn, selectIsRequestingLogin} from "../../../../reducers/account";
import {connect} from "react-redux";
import {createWallet, mnenomicVerificationSucceed, mneomicVerifcationFailed} from "../../../../actions";
import {Create} from "../presentational";
import {Component} from "react";
import React from "react";
import {Redirect} from "react-router";




export class CreatePage extends Component {




    verifySeed(typedSeed) {
        const verified =  typedSeed === this.props.mnemonic_string;
        verified? this.props.mnenomicVerificationSucceed() :  this.props.mneomicVerifcationFailed();
        return verified;
    }


    render() {

        if (this.props.isLoggedIn) {
            return <Redirect to="/wallet/assets" />;
        }

        return (<Create/>)

    }



}

const mapStateToProps = state => ({
    mnemonicString: state.keys.mnemonic_string,
    isLoggedIn: selectIsLoggedIn(state),
    isRequestingLogin: selectIsRequestingLogin(state)
});

export default connect(
    mapStateToProps,
    {
        getSeed: createWallet,
        mnenomicVerificationSucceed,
        mneomicVerifcationFailed
    }
)(CreatePage);
