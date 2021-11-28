import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { User } from '../commons/interfaces';
import { GlobalContext } from "../context/GlobalState";
import "./EditProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio
import axios from 'axios';

export function EditProfilePage (){
    const {OAuthResponse} = useContext(GlobalContext);
    let [name, setName] = useState<string>("" as string);
    let [showResults, setShowResults] = useState<boolean>(true);

    return (
        <div className="profileContainer">
            <div className="profileBox"> 
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>Edit Profile</b></p>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;