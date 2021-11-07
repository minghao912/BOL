import React, { useContext, useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import { COLORS } from '../commons/constants';
import { GlobalContext } from "../context/GlobalState";
import "./ProfilePage.css";
import BOL from '../images/BOL_light.png' //dimensions are 1280*511, keep logo in this aspect ratio

interface RouteParams {
    googleID: string
}

export function ProfilePage (props: any){
    const {OAuthResponse} = useContext(GlobalContext);
    let [imageUrl, setImageUrl] = useState<string>("" as string);

    useEffect(() => {
        setImageUrl(OAuthResponse.profileObj.imageUrl);
        
    }, [OAuthResponse])

    
    document.body.style.background = COLORS.BACKGROUND3;
    return (
        <div className="profileContainer">
            <div className="profileBox"> 
                <div className="profileSpace_top"></div>
                <div className="profilelogoContainer" > 
                    <img src={BOL} alt= 'BOL logo' width = "360" height = "153.3"/>
                </div>
                <div className="profile_space_Between_Logo_and_UserProfile">
                    <p><b>User Profile</b></p>
                </div>
                <div className="profileSpaceSmall"></div>
                <div className="profilelogoContainer" style={{color: COLORS.FULL_WHITE}}>
                    <img id='123' src= {imageUrl} alt = "Profile Picture" width = "150" height = "150" />
                </div>
                <div className="profileBreak">
                    <p> {(props.match!.params as RouteParams).googleID} </p>
                </div>
                <div className="profileSpace_middle"></div>  
                <div className="profileBreak">
                    <p> Hi! I am {(props.match!.params as RouteParams).googleID} and I love BOL! </p>
                </div>         
            </div>
        </div>
    );
}

export default ProfilePage;