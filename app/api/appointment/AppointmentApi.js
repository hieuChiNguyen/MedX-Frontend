import axiosJwt from '../axiosJwt'

const appointmentApi = {
    createNewAppointment: async (input) => {
        const response = await axiosJwt.post('/api/v1/appointment/create', input)
        return response
    },

    getAllAppointments: async () => {
        const response = await axiosJwt.get('/api/v1/appointment')
        return response
    },

    getAppointmentById: async (appointmentId) => {
        const response = await axiosJwt.get(`api/v1/appointment/${appointmentId}`)
        return response
    },

    addDoctorToAppointment: async (request) => {
        const response = await axiosJwt.post('/api/v1/appointment/doctor/schedule', request)
        return response
    },

    getAppointmentPatientHistory: async (patientId) => {
        const response = await axiosJwt.get(`/api/v1/appointments/history/${patientId}`)
        return response
    },

}

export default appointmentApi
