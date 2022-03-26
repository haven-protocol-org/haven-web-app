// Library Imports
import React, { Component, Suspense } from "react";
//@ts-ignore
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "shared/components/loader";
import { CreateWeb } from "../../pages/_auth/create";
import { LoginWeb } from "../../pages/_auth/login/container";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { isWeb } from "constants/env";
import { logM } from "utility/utility";

const onboardingVersion = 2;
class PublicRoutes extends Component {
  componentDidMount() {
    /*
    if (localStorage.getItem("onboard") !== onboardingVersion.toString() && isWeb() ) {
      this.props.showModal(MODAL_TYPE.LoginOnboarding);
      localStorage.setItem("onboard",onboardingVersion);
    }
*/
  }

  render() {
    return (
      <Suspense fallback={<Loader />}>
        <Route path="/create" exact component={CreateWeb} />
        <Route path="/" exact component={LoginWeb} />
      </Suspense>
    );
  }
}

export default connect(null, { showModal })(PublicRoutes);
