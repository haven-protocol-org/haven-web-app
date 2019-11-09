import {selectErrorMessageForLogin, selectIsLoggedIn, selectIsRequestingLogin} from "../../../../../reducers/account";
import {connect} from "react-redux";
import {restoreWallet} from "../../../../../actions";
import Login from "../../../../../pages/_auth/login";
import {Redirect} from "react-router";
import {Component} from "react";




class Login extends Component {


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

export const LoginWeb =   connect(
    mapStateToProps,
    { login: restoreWallet }
)(Login);
