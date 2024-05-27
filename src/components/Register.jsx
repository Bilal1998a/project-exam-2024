import React, { useState } from 'react';
import { registerUser } from './api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [venueManager, setVenueManager] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegistration = async () => {
        try {
            await registerUser({ name, email, password, venueManager });
            setRegistrationSuccess(true);
            setRegistrationError('');
            setName('');
            setEmail('');
            setPassword('');
            setVenueManager(false);
        } catch (error) {
            setRegistrationError(error.message || 'Registration failed');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
            />
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
                className="border border-gray-300 rounded px-3 py-2 w-full mb-3"
            />
            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    checked={venueManager}
                    onChange={() => setVenueManager(!venueManager)}
                    className="mr-2"
                />
                <label>Become venue manager</label>
            </div>
            <button
                onClick={handleRegistration}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full"
            >
                Register
            </button>
            {registrationError && <p className="text-red-500 mt-2">{registrationError}</p>}
            {registrationSuccess && <p className="text-green-500 mt-2">Registration successful!</p>}
        </div>
    );
};

export default Register;
