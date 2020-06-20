export const AuthActionType = {
    AUTH_STATE: 'AUTH_STATE',
};

// export const AuthToken = {
//     TOKEN_SET: 'TOKEN_SET',
// };

export const authState = (auth) => {
    return {
        type: AuthActionType.AUTH_STATE,
        auth,
    };
}

// export const tokenSet = (token) => {
//     return {
//         type: AuthToken.TOKEN_SET,
//         token,
//     };
// }