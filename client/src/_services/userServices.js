import { userConstants } from "../_constants/userConstants";

const register = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/register', requestOptions)
        .then(handleResponse);
};

const login = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/login', requestOptions)
        .then(handleResponse)
        .then((data) => {
            localStorage.setItem(
                userConstants.JWT_LOCAL_STORAGE_KEY,
                JSON.stringify(data)
            );
            return data;
        });
};

const logout = () => {
    localStorage.removeItem(userConstants.JWT_LOCAL_STORAGE_KEY);
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};

export const userServices = {
    register,
    login,
    logout
};