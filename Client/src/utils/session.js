export const setToken = (value) => {
    return localStorage.setItem("access_token", value);
};

export const getToken = (key) => {
    return localStorage.getItem(key);
};

export const removeToken = () => {
    return localStorage.removeItem("access_token");
};


export const removeUser = ()=>{
    return localStorage.removeItem("currentUser");
}