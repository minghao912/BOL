import React, { useContext, useEffect, useState } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Container, Box } from '@mui/material';
import { COLORS } from '../commons/constants';
import {GlobalContext} from '../context/GlobalState';

interface RouteParams {
    username: string
}

export function ProfilePage (props: any){
    const {OAuthResponse} = useContext(GlobalContext);
    let [imageUrl, setImageUrl] = useState<string>("" as string);

    useEffect(() => {
        setImageUrl(OAuthResponse.profileObj.imageUrl);
    }, [OAuthResponse])

    console.log(imageUrl);

    return (<>
    <Container maxWidth="sm">
    <p>Profile Page</p>
        <p>Your username is {(props.match!.params as RouteParams).username}</p>
        <img src = alt="Profile Picture"></img>
        <Box sx={{ bgcolor: COLORS.BACKGROUND, height: '100vh' }} />
    </Container>
    </>);
}

export default ProfilePage;