export const AuthToken = {
  TOKEN_SET: "TOKEN_SET",
};

export const tokenSet = (token) => {
  return {
    type: AuthToken.TOKEN_SET,
    token,
  };
};
