
import React, { Component } from "react";
import {connect} from "react-redux";
import {Settings} from "../../../../../universal/pages/_wallet/settings";
import {decrypt} from "../../../../../utility/utility";

class SettingsWebContainer extends Component {


    state = {
        psk:"",
        seed:""
    };



    componentDidMount() {

        Promise.all([
            decrypt(this.props.mnemonic_string),
            decrypt(this.props.sec_spendKey_string)
        ]).then(data => {
            this.setState({ seed: data[0], psk: data[1] });
        });
    }


    render() {

        const {pub_spendKey_string, sec_viewKey_string, pub_viewKey_string } = this.props.keys;
        const {psk, seed} = this.state;

        const keys = {pub_spendKey_string, sec_viewKey_string, pub_viewKey_string, psk, seed};

        return (
            <Settings {...keys} />
            )

    }

}


const mapStateToProps = state => ({
    keys: state.keys,
});

export const SettingsWeb = connect(
    mapStateToProps,
    {  }
)(SettingsWebContainer);
