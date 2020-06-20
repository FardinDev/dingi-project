import { AuthActionType } from '../Actions/AuthAction';
import { REHYDRATE } from 'redux-persist';
const unPersistedState = {
    authLists: [],

}

const defaultAuthState = {
    ...unPersistedState,
    auth: JSON.parse( localStorage.getItem('persist:root')).auth === 'false' ? false : true,
    lastItem: [],
   
}


const AuthReducer = (state = { ...defaultAuthState }, action) => {
    switch (action.type) {
        case AuthActionType.AUTH_STATE:
            return {
                ...state,
                auth: action.auth
            };
            case REHYDRATE:
            let { auth } = action.payload || {};
            return {
                ...state,
                ...(auth || {}),
                ...unPersistedState
            };

          
        default:
            return { ...state };
    }
}

export default AuthReducer;