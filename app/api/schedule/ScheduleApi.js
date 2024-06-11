import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const scheduleApi = {
    createNewSchedules: async (input) => {
        const response = await axiosJwt.post('/api/v1/schedule/create', input)
        return response
    },

    getSchedulesOfDoctor: async (doctorId) => {
        const response = await axiosJwt.get(`/api/v1/schedule/${doctorId}`)
        return response
    },

    getRemainScheduleByDate: async (data) => {
        console.log('okee');
        const response = await axiosClient.post('/api/v1/schedule/remain', data)
        return response
    },
}

export default scheduleApi
