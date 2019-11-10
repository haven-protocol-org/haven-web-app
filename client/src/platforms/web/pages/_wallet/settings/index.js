
import React, { Component } from "react";
import {connect} from "react-redux";
import {Settings} from "../../../../../pages/_wallet/settings";

class SettingsWebContainer extends Component {


    render() {

        return (
            <Settings {...this.props.keys}/>
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
