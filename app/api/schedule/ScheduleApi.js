import axiosJwt from '../axiosJwt'

const scheduleApi = {
    createNewSchedules: async (input) => {
        const response = await axiosJwt.post('/api/v1/schedule/create', input)
        return response
    },
}

export default scheduleApi
