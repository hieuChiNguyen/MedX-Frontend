import axiosClient from '../axiosClient'

const authApi = {
    login: async (email, password) => {
        try {
            const response = await axiosClient.post('/api/v1/login', { email: email, password: password });
            return response;
        } catch (error) {
            return error;
        }
    },

    register: async (input) => {
        try {
            const response = await axiosClient.post('/api/v1/register', input);
            return response;
        } catch (error) {
            return error.response;
        }
    },

    logout: async () => {
        const response = await axiosClient.post('/api/v1/logout')
        return response
    }
}

export default authApi
