import React, { useState } from 'react';
import { registerUser } from './api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegistration = async () => {
        try {
            await registerUser({ name, email, password });
            setRegistrationSuccess(true);
            setRegistrationError('');
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setRegistrationError(error.message || 'Registration failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-3" />
            {registrationError && <p className="text-red-500 mb-2">{registrationError}</p>}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-3" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full mb-6" />
            <button onClick={handleRegistration} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full">Register</button>
            {registrationSuccess && <p className="text-green-500 mt-2">Registration successful!</p>}
        </div>
    );
};

export default Register;
