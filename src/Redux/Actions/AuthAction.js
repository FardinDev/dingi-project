export const AuthActionType = {
  AUTH_STATE: "AUTH_STATE",
};

export const authState = (isLoggedIn, token) => {
  return {
    type: AuthActionType.AUTH_STATE,
    isLoggedIn,
    token,
  };
};
