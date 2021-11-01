import { createContext, useEffect, useReducer } from 'react';
import AppReducer, { ACTION_TYPES } from './AppReducer';

const initialState = {
   OAuthResponse: {},
   updateOAuth: (oauth: any) => {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Updates the state
    function updateOAuth(oauth: any) {
        console.log("Update to OAUTH received");

        dispatch({
            type: ACTION_TYPES.UPDATE_STATE,
            payload: oauth
        });
    }

    // Check if the JSON was updated
    useEffect(() => {
        console.log("Updated OAuth JSON: " + JSON.stringify(state.OAuthResponse));
    }, [state.OAuthResponse]);

    return(
        <GlobalContext.Provider value={{OAuthResponse: state.OAuthResponse, updateOAuth}}> 
            {children} 
        </GlobalContext.Provider>
    );
}