import axios from 'axios';
import toasts from '../components/common/Toast';
// require('dotenv').config();

const axiosJwt = axios.create({
    baseURL: 'http://medx.io.vn:8080' || 'http://localhost:8080',
    headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-cache',
    },
    // Handle with Cookies
    withCredentials: 'include',
});

axiosJwt.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Xử lý trường hợp token không tồn tại, ví dụ chuyển hướng đến trang đăng nhập
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosJwt.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return error.response.data
    }
);

export default axiosJwt
