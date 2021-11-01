import React, { useEffect, useContext } from 'react';
import { RouteChildrenProps } from 'react-router';

import { GlobalContext } from "../context/GlobalState";

interface RouteParams {
    username: string
}

export function ProfilePage(props: any): JSX.Element {
    const { OAuthResponse } = useContext(GlobalContext);

    useEffect(() => {
        console.log(OAuthResponse);
    }, [OAuthResponse])

    return (<>
        <p>Profile Page</p>
        <p>Your username is {(props.match!.params as RouteParams).username}</p>
    </>);
}

export default ProfilePage;