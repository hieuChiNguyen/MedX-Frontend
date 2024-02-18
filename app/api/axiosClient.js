import axios from 'axios'
import toasts from '../components/common/Toast'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache'
    },
    // Handle with Cookies
    withCredentials: 'include'
})

axiosClient.interceptors.response.use((response) => {
    if (response.status !== 200 || response.status !== 201) {
        if (response.data.message === 'ERROR') {
            toasts.errorTopRight(response.data.data)
        }
    }

    // console.log('check axiosClient: ', response)
    return response.data
})

export default axiosClient
