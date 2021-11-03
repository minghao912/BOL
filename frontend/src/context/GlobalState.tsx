import { createContext, useEffect, useReducer } from 'react';
import AppReducer, { ACTION_TYPES } from './AppReducer';

const initialState = {
    OAuthResponse: getLocalOAuthResponse(),
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

        // Update localStorage as well, just in case user presses refresh
        localStorage.setItem("OAuthResponse", JSON.stringify(oauth));
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

// Get the local storage OAuth JSON, if there is
function getLocalOAuthResponse(): any {
    let localJSON = localStorage.getItem("OAuthResponse");

    if (localJSON == null || localJSON == undefined)
        return {};
    else {
        let parsedJSON: any;
        try {
            parsedJSON = JSON.parse(localJSON);
        } catch (e) {
            return {}
        }

        if (parsedJSON == {})
            return {};
        else return parsedJSON;
    }
}