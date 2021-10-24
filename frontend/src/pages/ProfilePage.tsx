import React from 'react';
import { RouteChildrenProps } from 'react-router';

interface RouteParams {
    username: string
}

export class ProfilePage extends React.Component<RouteChildrenProps> {
    render() {
        return (<>
            <p>Profile Page</p>
            <p>Your username is {(this.props.match!.params as RouteParams).username}</p>
        </>);
    }
}

export default ProfilePage;