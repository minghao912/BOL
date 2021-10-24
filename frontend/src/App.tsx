import React from 'react';
import { Router } from 'react-router-dom';

import AppRouter from './router';
import { history } from './commons/history';

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <AppRouter />
            </Router>
        );
    }
}

export default App;