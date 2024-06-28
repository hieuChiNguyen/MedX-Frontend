import axios from 'axios'
import toasts from '../components/common/Toast'

const axiosClient = axios.create({
    baseURL: 'http://medx.io.vn:8080' || 'http://localhost:8080',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache'
    },
    // Handle with Cookies
    withCredentials: 'include'
})

axiosClient.interceptors.response.use(
    (response) => {
        console.log('1:',axiosClient.backendUrl);
        return response.data
    },
    (error) => {
        console.log('2:',axiosClient.backendUrl);
        // return error.response.data
        return error.response.data
    }
)

export default axiosClient
