import React from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import "./LoginPage.css";
import { COLORS } from "../commons/constants";
import { GlobalContext } from "../context/GlobalState";
import logo from '../images/bakugo2-transparent-white.svg'; // OK if there is red underline
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';

interface GoogleLoginProps {
    clientId: string,
    buttonText: string,
    onSuccess: (response: any) => any,
    onFailure: (response: any) => any,
    cookiePolicy: string
}

/*
// DEV
function skipGoogleLogin(response: any): void {
    console.log(response);
}
*/

export class LoginPage extends React.Component<{}, {loginAuthorized: boolean}> {
    static contextType = GlobalContext; // Establishes the this.context variable to access global context

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

        // Updates the OAuth response globally
        this.context.updateOAuth(response);
        const userID = response.profileObj.googleId;

        // Tell the database to add the user, backend handles duplicates
        axios.post('http://localhost:5000/sources/addUser', {
            "userID": userID
        }).then(response => {
            console.log(`The user ${userID} has been updated in the backend; alreadyExisted is ${response.data.alreadyExisted}`);
        }).catch(err => {
            console.error(err);
        });
    }
    
    // Runs when OAUTH fails
    loginFailure = (response: any): void => {
        alert("There was an error with your Google sign-in");
        console.error("Error: Google OAuth failed\n" + response);
    }

    render() {
        const LOGINPROPS = {
            clientId: process.env.REACT_APP_GOOGLE_KEY,
            buttonText: "Sign in with Google",
            onSuccess: this.loginSuccess,
            onFailure: this.loginFailure,
            cookiePolicy: "single_host_origin"
        } as GoogleLoginProps;

        // If login authorized go to home page, else show the login page
        if (this.state.loginAuthorized) {
            return (
                <Redirect to={{pathname: "/home"}} />
            );
        } else {
            document.body.style.background = COLORS.BACKGROUND3;
            return (
            <div className="container" style={{backgroundColor: COLORS.BACKGROUND}}>
                {/* using a different container for the logo here because it needs margins*/}
                <div className="logoContainer" style={{color: COLORS.FULL_WHITE}}> 
                    <img src={BOL} alt= 'BOL logo' width = "768" height = "306.6"/>
                </div>
                {/* LogoContainer fits better here too, normal one has too much vertical space */}
                {/* <div className="logoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img src={logo} alt= 'Kacchan' width = "960" height = "564"/>
                </div> */}
                <div className="break"></div>*
                <div className="sub-container">
                    <GoogleLogin
                        clientId={LOGINPROPS.clientId}
                        buttonText={LOGINPROPS.buttonText}
                        onSuccess={LOGINPROPS.onSuccess}
                        onFailure={LOGINPROPS.onFailure}
                        cookiePolicy={LOGINPROPS.cookiePolicy}
                    />
                    {/* DEV
                    <Link to="/home">
                        <h3>Skip Google Login</h3>
                    </Link>*/}
                </div>
                <div className="break"></div>
                <div className="sub-container" style={{height:"50px"}}></div>
            </div>
            );
        }
    }
}

export default LoginPage;