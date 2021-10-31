import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFoundPage from './pages/PageNotFoundPage';

// Handles which URLs go to which pages
function AppRouter() {
    return (
    <Switch>
        <Route path="/" exact component={ LoginPage } />
        <Route path="/home" exact render={(props) => <Homepage {...props}/>} />
        <Route path="/profile/:username" component={ ProfilePage } />

        {/* This is the default case */}
        <Route path="/" component={ PageNotFoundPage } />
    </Switch>
    );
}

export default AppRouter;