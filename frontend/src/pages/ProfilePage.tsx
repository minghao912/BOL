import React, { useContext, useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Container, Box, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { COLORS } from '../commons/constants';
import { GlobalContext } from "../context/GlobalState";

interface RouteParams {
    username: string
}

export function ProfilePage (props: any){
    const {OAuthResponse} = useContext(GlobalContext);
    let [imageUrl, setImageUrl] = useState<string>("" as string);

    useEffect(() => {
        setImageUrl(OAuthResponse.profileObj.imageUrl);
        
    }, [OAuthResponse])
    document.body.style.background = COLORS.BACKGROUND3;
    return (
    <div className="container">
        <div className="box"> 
        <div className="logoContainer" style={{color: COLORS.FULL_WHITE}}>
            <img id='123' src= {imageUrl} alt = "Profile Picture" width = "100" height = "100" />
        </div>
        <p>Profile</p>
        <div className="break">
            <p>Your username is {(props.match!.params as RouteParams).username}</p>
        </div>
        </div>
    </div>
    );
}

export default ProfilePage;