import {ThemeProvider} from "styled-components";
import {connect} from "react-redux";
import React, {Component} from "react";


class App extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>

            </ThemeProvider>
        );
    }
}

export const mapStateToProps = state => ({
    theme: state.theme
});

export const AppDesktop =  connect(mapStateToProps)(App);
