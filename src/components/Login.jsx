import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://v2.api.noroff.dev/auth/login', { email, password });
            const userData = response.data;

            localStorage.setItem('authToken', userData.data.accessToken);

            // Generate API key
            const apiKeyResponse = await axios.post('https://v2.api.noroff.dev/auth/create-api-key', {}, {
                headers: {
                    Authorization: `Bearer ${userData.data.accessToken}`
                }
            });
            const apiKey = apiKeyResponse.data.data.key;

            login(userData.data.name, apiKey);
            navigate('/profilepage');
        } catch (error) {
            setLoginError(error.message || 'Login failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-6"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
            >
                Login
            </button>
            {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </div>
    );
};

export default Login;
