export enum ACTION_TYPES {
    UPDATE_STATE
}

interface StateDispatchAction {
    type: ACTION_TYPES,
    payload: any
}
 
export default function AppReducer(state: any, action: StateDispatchAction) {
    switch(action.type) {
        case ACTION_TYPES.UPDATE_STATE:     // Returns the new state with updated OAuthResponse
            return {
                ...state,
                OAuthResponse: action.payload
            }
        default:
            return state;
    }
}