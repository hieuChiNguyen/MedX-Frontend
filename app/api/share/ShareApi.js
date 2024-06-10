import axiosClient from '../axiosClient'

const shareApi = {
    verifyCode: async (data) => {
        const response = await axiosClient.post('/api/v1/history/check', data)
        return response
    },
}

export default shareApi
