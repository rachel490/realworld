export const JWTKey = "jwt";

export const tokenUtil = {
  getToken: () => {
    return localStorage.getItem(JWTKey);
  },
  setToken: (token: string) => {
    localStorage.setItem(JWTKey, token);
  },
  hasToken: () => {
    return !!localStorage.getItem(JWTKey);
  },
  removeToken: () => {
    localStorage.removeItem(JWTKey);
  },
};
