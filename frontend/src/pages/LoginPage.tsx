import React from 'react';
import { Link } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

import "./LoginPage.css";

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
        console.log(process.env.REACT_APP_GOOGLE_KEY);

        const LOGINPROPS = {
            clientId: process.env.REACT_APP_GOOGLE_KEY,
            buttonText: "Sign in with Google",
            onSuccess: responseReceived,
            onFailure: responseReceived,
            cookiePolicy: "single_host_origin"
        } as GoogleLoginProps;

        return (
            <div className="container">
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
                        <h1>Skip Google Login</h1>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginPage;