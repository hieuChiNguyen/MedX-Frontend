import axios from 'axios'
import toasts from '../components/common/Toast'
require('dotenv').config()

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache'
    },
    // Handle with Cookies
    withCredentials: 'include'
})

axiosClient.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // return error.response.data
        return error.response.data
    }
)

export default axiosClient
