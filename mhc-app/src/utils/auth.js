const TOKEN_KEY = 'mhc_token';
const USER_KEY  = 'mhc_user';

export function getToken()    { return localStorage.getItem(TOKEN_KEY); }
export function getUser()     { return localStorage.getItem(USER_KEY); }
export function isLoggedIn()  { return !!getToken(); }

export function saveAuth(token, username) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
