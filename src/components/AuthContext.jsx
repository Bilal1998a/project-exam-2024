import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    const login = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
