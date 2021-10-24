import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

// Default 404 Page Not Found page
class PageNotFoundPage extends React.Component {
    render() {
        return(
            <p>404 Not Found</p>
        );
    }
}

// Handles which URLs go to which pages
function AppRouter() {
    return (
    <Switch>
        <Route path="/" exact component={ LoginPage } />
        <Route path="/home" exact component={ Homepage } />
        <Route path="/profile/:username" component={ ProfilePage } />

        {/* This is the default case */}
        <Route path="/" component={ PageNotFoundPage } />
    </Switch>
    );
}

export default AppRouter;