export const getToken = () => {
  if (window.sessionStorage.getItem('token')) {
    return window.sessionStorage.getItem('token');
  }
  return window.localStorage.getItem('token');
};

export const setToken = (token: any, remember: boolean = false) => {
  window.sessionStorage.setItem('token', token);
  if (remember) {
    window.localStorage.setItem('token', token);
  }
};

export const removeToken = () => {
  window.sessionStorage.removeItem('token');
  window.localStorage.removeItem('token');
};
