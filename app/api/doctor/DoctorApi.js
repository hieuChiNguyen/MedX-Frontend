import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const doctorApi = {
    createNewDoctor: async (userId, input) => {
        const response = await axiosClient.post(`/api/v1/doctor/create/${userId}`, input)
        return response
    },

    // Admin
    getAllDoctors: async (status, specialtyId) => {
        const response = await axiosJwt.get(`/api/v1/doctor?status=${status}&specialty=${specialtyId}`)
        return response
    },

    paginateAllDoctors: async (currentPage, itemsPerPage) => {
        const response = await axiosClient.get(`/api/v1/doctor/active/${currentPage}/${itemsPerPage}`)
        return response
    },

    getAllActiveDoctors: async () => {
        const response = await axiosClient.get('/api/v1/doctor/active')
        return response
    },

    getDoctorById: async (doctorId) => {
        const response = await axiosClient.get(`/api/v1/doctor/${doctorId}`)
        return response
    },

    getDoctorByAdmin: async (doctorId) => {
        const response = await axiosJwt.get(`/api/v1/doctor/admin/${doctorId}`)
        return response
    },

    // Any roles
    getAllSpecialties: async () => {
        const response = await axiosClient.get('/api/v1/specialties')
        return response
    },

    // Any roles
    paginateAllSpecialties: async (currentPage, itemsPerPage) => {
        const response = await axiosClient.get(`/api/v1/specialties/${currentPage}/${itemsPerPage}`)
        return response
    },

    // Any roles
    getTopSpecialties: async (c) => {
        const response = await axiosClient.get(`/api/v1/specialties/top`)
        return response
    },

    // Any roles
    getListDoctorsBySpecialty: async (specialty) => {
        const response = await axiosClient.get(`/api/v1/specialty/${specialty}`)
        return response
    },

    getAllPositions: async () => {
        const response = await axiosClient.get('/api/v1/positions')
        return response
    },

    activateDoctorAccount: async (doctorId) => {
        const response = await axiosJwt.patch(`/api/v1/doctor/activate/${doctorId}`)
        return response
    },

    findSuitableDoctors: async (data) => {
        const response = await axiosJwt.post('/api/v1/doctor/search', data)
        return response
    },

    createDoctorDetailContent: async (data) => {
        const response = await axiosJwt.post('/api/v1/markdown/create', data)
        return response
    },

    getDoctorDetailContent: async (doctorId) => {
        const response = await axiosClient.get(`/api/v1/markdown/doctor/${doctorId}`)
        return response
    },

    getDoctorAppointment: async (doctorId) => {
        const response = await axiosJwt.get(`/api/v1/appointment_doctor/${doctorId}`)
        return response
    },

    updateResultExam: async (data) => {
        const response = await axiosJwt.post('/api/v1/history/create', data)
        return response
    },

    getRandomTopDoctors: async () => {
        const response = await axiosClient.get('/api/v1/doctor/top')
        return response
    },

    getDetailSpecialty: async (specialtyId) => {
        const response = await axiosClient.get(`/api/v1/specialty/detail/${specialtyId}`)
        return response
    }
}

export default doctorApi
