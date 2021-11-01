import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import "./LoginPage.css";
import { COLORS } from "../commons/constants";
import { GlobalContext } from "../context/GlobalState";

interface GoogleLoginProps {
    clientId: string,
    buttonText: string,
    onSuccess: (response: any) => any,
    onFailure: (response: any) => any,
    cookiePolicy: string
}

// DEV
function skipGoogleLogin(response: any): void {
    console.log(response);
}

export class LoginPage extends React.Component<{}, {loginAuthorized: boolean, oauthResponse?: any}> {
    static contextType = GlobalContext;

    constructor(props: any) {
        super(props)

        this.state = {
            loginAuthorized: false
        }
    }

    // Runs when OAUTH works, response JSON in response
    loginSuccess = (response: any): void => {
        this.setState({
            loginAuthorized: true,
        });

        this.context.updateOAuth(response);
    }
    
    // Runs when OAUTH fails
    loginFailure = (response: any): void => {
        alert("There was an error with your Google sign-in")
    }

    render() {
        const LOGINPROPS = {
            clientId: process.env.REACT_APP_GOOGLE_KEY,
            buttonText: "Sign in with Google",
            onSuccess: this.loginSuccess,
            onFailure: this.loginFailure,
            cookiePolicy: "single_host_origin"
        } as GoogleLoginProps;

        if (this.state.loginAuthorized) {
            return (
                <Redirect 
                    to={{
                        pathname: "/home",
                        state: { oauthResponse: this.state.oauthResponse }
                    }} 
                />
            );
        } else {
            return (
            <div className="container" style={{backgroundColor: COLORS.BACKGROUND}}>
                <div className="sub-container" style={{color: COLORS.FULL_WHITE}}>
                    <h1>&#x1F171;iscord️</h1>
                </div>
                <div className="break"></div>
                <div className="sub-container">
                    <GoogleLogin
                        clientId={LOGINPROPS.clientId}
                        buttonText={LOGINPROPS.buttonText}
                        onSuccess={LOGINPROPS.onSuccess}
                        onFailure={LOGINPROPS.onFailure}
                        cookiePolicy={LOGINPROPS.cookiePolicy}
                    />
                    <div className="break"></div>

                    {/* DEV
                    <Link to="/home">
                        <h3>Skip Google Login</h3>
                    </Link>*/}
                </div>
            </div>
            );
        }
    }
}

export default LoginPage;