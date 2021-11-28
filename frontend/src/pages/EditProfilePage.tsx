import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { User } from '../commons/interfaces';
import { GlobalContext } from "../context/GlobalState";
import "./EditProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';
import { useHistory } from "react-router-dom";

export function EditProfilePage (){
    const {OAuthResponse} = useContext(GlobalContext);
    let [new_name, setName] = useState<string>("" as string);
    let [new_bio, setBio] = useState<string>("" as string);
    let [showResults, setShowResults] = useState<boolean>(true);

    console.log(OAuthResponse);
    const google_id: string = OAuthResponse.profileObj.googleID;
    const imageUrl:  string = OAuthResponse.profileObj.imageUrl;
    //console.log(new_name);
    //console.log(new_bio);


    const history = useHistory();
    
    const routeChange = () =>{ 
        let path = "/home"; 
        history.push(path);
    }


    return (
        <div className="profileContainer">
            <div className="profileBox"> 
                <div className="homeButton" style={{float:"left"}} onClick = {routeChange} >
                    <span style={{color:"#ffffff"}} > Home </span>
                </div>
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>

                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>Edit Profile</b></p>
                </div>

                <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img id='123' src= {imageUrl} alt = "Profile Picture" width = "125" height = "125" />
                </div>

                <input type="text" id="message-box" className="username-change-bar" autoComplete="off"
                    placeholder="Enter a username here"
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea rows={3} id="message-box" className="bio-change-bar" autoComplete="off"
                    placeholder="Enter your bio here"
                    onChange={(e) => setBio(e.target.value)}
                ></textarea>

                <div className="profilefriendButton" onClick = {routeChange} >
                    <span style={{color:"#ffffff"}} >Save Changes </span>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;