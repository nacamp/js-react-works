export const getToken = () => {
    return window.sessionStorage.getItem('token');
};

export const setToken = (token: any) => {
    window.sessionStorage.setItem('token', token);
};

export const removeToken = () => {
    window.sessionStorage.removeItem('token');
};