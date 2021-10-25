import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import "./LoginPage.css";
import { COLORS } from "../commons/constants";

interface GoogleLoginProps {
    clientId: string,
    buttonText: string,
    onSuccess: (response: any) => any,
    onFailure: (response: any) => any,
    cookiePolicy: string
}

function responseReceived(response: any): void {
    console.log(response);
}

export class LoginPage extends React.Component {
    render() {
        const LOGINPROPS = {
            clientId: process.env.REACT_APP_GOOGLE_KEY,
            buttonText: "Sign in with Google",
            onSuccess: responseReceived,
            onFailure: responseReceived,
            cookiePolicy: "single_host_origin"
        } as GoogleLoginProps;

        return (
            <div className="container" style={{backgroundColor: COLORS.OFF_BLACK}}>
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
                    <Link to="/home">
                        <h3>Skip Google Login</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginPage;