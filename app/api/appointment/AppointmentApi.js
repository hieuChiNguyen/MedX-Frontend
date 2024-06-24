import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const appointmentApi = {
    // Patient, Admin, Receptionist
    createNewAppointment: async (input) => {
        const response = await axiosJwt.post('/api/v1/appointment/create', input)
        return response
    },

    // Admin, Receptionist
    getAllAppointments: async (status, specialty, start, end) => {
        const response = await axiosJwt.get(`/api/v1/appointment?status=${status}&specialty=${specialty}&start=${start}&end=${end}`)
        return response
    },

    // Patient, Admin, Receptionist
    getAppointmentById: async (appointmentId) => {
        const response = await axiosJwt.get(`api/v1/appointment/${appointmentId}`)
        return response
    },

    //  Admin, Receptionist
    addDoctorToAppointment: async (request) => {
        const response = await axiosJwt.post('/api/v1/appointment/doctor/schedule', request)
        return response
    },

    // Patient
    getAppointmentPatientHistory: async (patientId) => {
        const response = await axiosJwt.get(`/api/v1/appointments/history/${patientId}`)
        return response
    },

    cancelAppointment: async (appointmentId) => {
        const response = await axiosJwt.patch(`/api/v1/appointment/cancel/${appointmentId}`)
        return response
    },

    getAllPrices: async () => {
        const response = await axiosClient.get(`/api/v1/prices`)
        return response
    },
}

export default appointmentApi
