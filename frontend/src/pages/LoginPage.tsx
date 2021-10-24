import React from 'react';
import { Link } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';

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
            clientId: "",
            buttonText: "Sign in with Google",
            onSuccess: responseReceived,
            onFailure: responseReceived,
            cookiePolicy: "single_host_origin"
        } as GoogleLoginProps;

        return (<>
            <GoogleLogin
                clientId={LOGINPROPS.clientId}
                buttonText={LOGINPROPS.buttonText}
                onSuccess={LOGINPROPS.onSuccess}
                onFailure={LOGINPROPS.onFailure}
                cookiePolicy={LOGINPROPS.cookiePolicy}
            />

            <Link to="/home">
                <h1>Home</h1>
            </Link>
        </>);
    }
}

export default LoginPage;