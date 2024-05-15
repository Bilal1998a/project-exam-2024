import React, { useState } from 'react';
import Login from './Login';
import Home from './Home/Home'; // Import the Home component
import { loginUser } from './api'; // Import the loginUser function

const ProfilePage = () => {
    const [userData, setUserData] = useState(null); // State to hold user data
    const [loginError, setLoginError] = useState(''); // State to hold login error

    const handleLogin = async (email, password) => {
        try {
            // Call the loginUser function with email and password
            const user = await loginUser(email, password);
            // Set the user data after successful login
            setUserData(user.data);
            console.log('Login successful');
        } catch (error) {
            // Handle login error
            setLoginError(error.message || 'Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Login onLogin={handleLogin} />
            {/* Pass userData to the Home component */}
            <Home userData={userData} />
        </div>
    );
};

export default ProfilePage;
