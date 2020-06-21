import { AuthActionType } from "../Actions/AuthAction";
import { REHYDRATE } from "redux-persist";
const unPersistedState = {};

const defaultAuthState = {
  ...unPersistedState,
  isLoggedIn: false,
  token: "",
};

const AuthReducer = (state = { ...defaultAuthState }, action) => {
  switch (action.type) {
    case AuthActionType.AUTH_STATE:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        token: action.token,
      };
    case REHYDRATE:
      let { auth } = action.payload || {};
      return {
        ...state,
        ...(auth || {}),
        ...unPersistedState,
      };

    default:
      return { ...state };
  }
};

export default AuthReducer;
