import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import React, { Component, Suspense } from "react";
import { NavigationDesktop } from "../platforms/desktop/components/navigation";
import { PrivateRoutes } from "./routes/private";
import { StatusComponent } from "./components/_layout/status";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ModalContainerDesktop } from "platforms/desktop/components/modalContainer";
import { FixedStatus } from "platforms/desktop/components/fixedStatusContainer";
import { isDesktop } from "constants/env";
import { NavigationWeb } from "platforms/web/components/navigation";
import { CreateWeb } from "platforms/web/pages/_auth/create";
import { LoginWeb } from "platforms/web/pages/_auth/login/container";
import Loader from "shared/components/loader";
import { AssetsDesktop } from "platforms/desktop/pages/_wallet/assets";
import { HavenDetailWithParams } from "platforms/desktop/pages/_wallet/details";
import { ExchangePage } from "shared/pages/_wallet/exchange";
import { HavenTransfer } from "platforms/desktop/pages/_wallet/transfer";
import { SettingsDesktop } from "platforms/desktop/pages/_wallet/settings";
import { SettingsWeb } from "platforms/web/pages/_wallet/settings";
import { RestoreDesktop } from "platforms/desktop/pages/_auth/restore";
import LoginDesktop from "platforms/desktop/pages/public/login";
import CreateDesktop from "platforms/desktop/pages/public/create";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <HashRouter>
        {isDesktop() ? <NavigationDesktop /> : <NavigationWeb />}
        <StatusComponent />
        <ModalContainerDesktop />
        {isDesktop() && <FixedStatus />}
        <Suspense fallback={<Loader />}>
        <Routes>

        <Route path="/"  element={isDesktop() ?  <LoginDesktop /> : <CreateWeb /> } />
        <Route path="/login"  element={ isDesktop() ? <RestoreDesktop /> :  <LoginWeb />} />
        <Route path="/create" element={ isDesktop() ? <CreateDesktop /> : <Navigate to="/login" />} /> 
        <Route path="/wallet" element={<PrivateRoutes />} > 
          <Route path="assets" element={<AssetsDesktop />} />
           <Route path="assets/:id" element={<HavenDetailWithParams />} />
          <Route path="transfer" element={<HavenTransfer />}/>
          <Route path="settings" element={isDesktop() ? <SettingsDesktop /> : <SettingsWeb />}/>
          <Route path="convert"  element={<ExchangePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = (state) => ({
  theme: state.theme,
});

export const HavenApp = connect(mapStateToProps)(App);
