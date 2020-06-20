export const AuthActionType = {
    AUTH_STATE: 'AUTH_STATE',
};

export const authState = (auth) => {
    return {
        type: AuthActionType.AUTH_STATE,
        auth,
    };
}