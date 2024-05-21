import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { loginUser } from './api';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (email, password) => {
        try {
            const user = await loginUser(email, password);
            setUserData(user.data);
            console.log('Login successful');
        } catch (error) {
            setLoginError(error.message || 'Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Login onLogin={handleLogin} />
            <Register />
        </div>
    );
};

export default ProfilePage;
