import axiosJwt from '../axiosJwt'

const scheduleApi = {
    createNewSchedules: async (input) => {
        const response = await axiosJwt.post('/api/v1/schedule/create', input)
        return response
    },

    getSchedulesOfDoctor: async (doctorId) => {
        const response = await axiosJwt.get(`/api/v1/schedule/${doctorId}`)
        return response
    }
}

export default scheduleApi
