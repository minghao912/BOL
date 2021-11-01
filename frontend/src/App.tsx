import React from 'react';
import { Router } from 'react-router-dom';

import AppRouter from './router';
import { history } from './commons/history';
import { GlobalProvider } from './context/GlobalState'


class App extends React.Component {
    render() {
        return (
            <GlobalProvider>
                <Router history={history}>
                    <AppRouter />
                </Router>
            </GlobalProvider>
        );
    }
}

export default App;