import axiosClient from '@/app/api/axiosClient'

const appointmentApi = {
    createNewAppointment: async (input) => {
        console.log('Check new data: ', input)
        const response = await axiosClient.post('/api/v1/appointment/create-new-appointment', input)
        console.log('Response: ', response)
        return response
    },

    getAllAppointments: async () => {
        const response = await axiosClient.get('/api/v1/appointment/list-appointments')
        return response
    },

    getDaysOfWeek: async () => {
        const response = await axiosClient.get('/api/v1/appointment/list-days')
        return response
    }
}

export default appointmentApi
