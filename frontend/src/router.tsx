import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import DebugHomepage from './pages/DebugHomepage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import SearchPage from './pages/SearchPage';
import CreateGroup from './pages/CreateGroup';
import EditProfilePage from './pages/EditProfilePage';
import ReportPage from './pages/ReportPage';

// Handles which URLs go to which pages
function AppRouter() {
    return (
    <Switch>
        <Route path="/" exact component={ LoginPage } />
        <Route path="/home" exact render={(props) => <Homepage {...props}/>} />
        <Route path="/debug" exact render={(props) => <DebugHomepage {...props}/>} />
        <Route path="/profile/:googleID" render={(props) =>  <ProfilePage {...props} hasID={true} /> } />
        <Route path="/profile" render={(props) => <ProfilePage {...props} hasID={false} /> } />
        <Route path="/editprofile" exact component={ EditProfilePage } />
        <Route path="/search" exact component={ SearchPage } />
        <Route path="/creategroup" exact component={ CreateGroup } />
        <Route path="/report" exact component={ ReportPage } />
        {/*<Route path="/profile/:username" component={ ProfilePage } />*/}        

        {/* This is the default case */}
        <Route path="/" component={ PageNotFoundPage } />
    </Switch>
    );
}

export default AppRouter;