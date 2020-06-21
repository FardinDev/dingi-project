import { AuthToken } from '../Actions/TokenAction';
import { REHYDRATE } from 'redux-persist';
const unPersistedState = {
  

}

const defaultToken = {
    ...unPersistedState,
    token: '',

}

const TokenReducer = (state = { ...defaultToken }, action) => {
    switch (action.type) {
        case AuthToken.TOKEN_SET:
            return {
                ...state,
                token: action.token
            };
        case REHYDRATE:
            let { token } = action.payload || {};
          
            return {
                ...state,
                ...(token || {}),
                ...unPersistedState
            };

          
        default:
            return { ...state };
    }
}

export default TokenReducer;