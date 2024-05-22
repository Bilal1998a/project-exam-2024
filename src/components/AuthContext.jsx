import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');

    const login = (name, key) => {
        setIsLoggedIn(true);
        setUsername(name);
        setApiKey(key);
        localStorage.setItem('username', name);
        localStorage.setItem('apiKey', key);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setApiKey('');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('apiKey');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, apiKey, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
