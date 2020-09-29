import React, {Component} from "react";
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";


class GoogleOAuth extends Component {


    // for google API lib
    // Google's JS lib invokes a callback in our React/Redux app
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '886170201545-8jolq0acio45qbv6ja6v1rjldn39atg3.apps.googleusercontent.com',
                scope: 'email'
            })
                //check if the lib initialized successfully
                .then( () => {
                    this.auth = window.gapi.auth2.getAuthInstance();

                    this.onAuthChange(this.auth.isSignedIn.get());
                     this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    //helper method
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui green google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleOAuth);
