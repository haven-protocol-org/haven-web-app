// Library Imports
import React, { Component, Suspense } from "react";
//@ts-ignore
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "shared/components/loader";
import { CreateWeb } from "../../pages/_auth/create";
import { LoginWeb } from "../../pages/_auth/login/container";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal"

class PublicRoutes extends Component {

  componentDidMount() {
    this.props.showModal(MODAL_TYPE.LoginOnboarding);
  }


  render() {
    return (
      <Suspense fallback={<Loader />}>
        <Route path="/" exact component={CreateWeb} />
        <Route path="/login" exact component={LoginWeb} />
      </Suspense>
    );
  }
}

export default connect( null, { showModal })(
  PublicRoutes
);