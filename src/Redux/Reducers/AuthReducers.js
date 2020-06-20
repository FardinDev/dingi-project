import { AuthActionType } from '../Actions/AuthAction';

const unPersistedState = {
    authLists: [],
    
}

const defaultAuthState = {
    ...unPersistedState,
    lastItem: [],
   
}


const AuthReducer = (state = { ...defaultAuthState }, action) => {
    switch (action.type) {
        case AuthActionType.AUTH_STATE:
            return {
                ...state,
                auth: action.auth
            };

          
        default:
            return { ...state };
    }
}

export default AuthReducer;