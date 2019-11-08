import {selectErrorMessageForLogin, selectIsLoggedIn, selectIsRequestingLogin} from "../../../../reducers/account";
import {connect} from "react-redux";
import {restoreWallet} from "../../../../actions";
import Login from "../presentational";
import {Redirect} from "react-router";
import {Component} from "react";




class LoginPage extends Component {


    render(){

        if (this.props.isLoggedIn) {
            return <Redirect to="/wallet/assets" />;
        }

        return (

            <Login isRequestingLogin={this.props.isRequestingLogin}
                   errorMessage={this.props.errorMessage} login={this.props.login}/>
        )
    }

}





const mapStateToProps = state => ({
    isRequestingLogin: selectIsRequestingLogin(state),
    isLoggedIn: selectIsLoggedIn(state),
    errorMessage: selectErrorMessageForLogin(state)
});

export default connect(
    mapStateToProps,
    { login: restoreWallet }
)(LoginPage);
