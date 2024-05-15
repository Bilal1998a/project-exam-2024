import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        try {
            // Perform login logic
            // If login successful, call the onLogin function and redirect to homepage
            await onLogin(); // Ensure onLogin is called as a function
            console.log('Login successful');
            // Redirect to homepage
            window.location.href = '/'; // Change the URL to the homepage
        } catch (error) {
            // Handle login error
            setLoginError(error.message || 'Login failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-3" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-6" />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full">Login</button>
            {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        </div>
    );
};

export default Login;
