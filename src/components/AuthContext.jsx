import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');

    const login = (name, token, key) => {
        setIsLoggedIn(true);
        setUsername(name);
        setAuthToken(token);
        setApiKey(key);
        localStorage.setItem('username', name);
        localStorage.setItem('authToken', token);
        localStorage.setItem('apiKey', key);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setAuthToken('');
        setApiKey('');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('apiKey');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, authToken, apiKey, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
