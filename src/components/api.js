import axios from 'axios';

const BASE_URL = 'https://v2.api.noroff.dev/auth'; // Update the base URL

export const registerUser = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
    }
};
