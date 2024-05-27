import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

    const login = (name, key, token) => {
        setIsLoggedIn(true);
        setUsername(name);
        setApiKey(key);
        setAuthToken(token);
        localStorage.setItem('username', name);
        localStorage.setItem('apiKey', key);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setApiKey('');
        setAuthToken('');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('apiKey');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, apiKey, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
