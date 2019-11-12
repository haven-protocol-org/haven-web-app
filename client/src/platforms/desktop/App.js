import {ThemeProvider} from "styled-components";
import {connect} from "react-redux";
import React, {Component, Suspense} from "react";
import {Route, Router} from "react-router";
import history from "../../history";
import Navigation from "../web/App";
import PublicRoutes from "./routes/public";


class App extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Router history={history}>
                    <Navigation />
                    <Status />
                    <PublicRoutes />
                    <Suspense fallback={<Loader/>}>
                        <Route path="/wallet" component={PrivateRoutesWeb} />
                    </Suspense>
                </Router>
            </ThemeProvider>
        );
    }
}

export const mapStateToProps = state => ({
    theme: state.theme
});

export const AppDesktop =  connect(mapStateToProps)(App);
