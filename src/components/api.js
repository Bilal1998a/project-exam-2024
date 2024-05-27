import axios from 'axios';

export const registerUser = async ({ name, email, password, venueManager }) => {
    const response = await axios.post('https://v2.api.noroff.dev/auth/register', {
        name,
        email,
        password,
        venueManager,
    });

    return response.data;
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
