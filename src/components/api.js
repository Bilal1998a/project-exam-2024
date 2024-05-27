import axios from 'axios';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('https://v2.api.noroff.dev/auth/register', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
