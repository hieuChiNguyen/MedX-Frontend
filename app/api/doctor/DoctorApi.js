import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const doctorApi = {
    createNewDoctor: async (userId, input) => {
        const response = await axiosClient.post(`/api/v1/doctor/create/${userId}`, input)
        return response
    },

    getAllDoctors: async () => {
        const response = await axiosClient.get('/api/v1/doctor')
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

    getAllSpecialties: async () => {
        const response = await axiosClient.get('/api/v1/specialties')
        return response
    },

    paginateAllSpecialties: async (currentPage, itemsPerPage) => {
        const response = await axiosClient.get(`/api/v1/specialties/${currentPage}/${itemsPerPage}`)
        return response
    },

    getTopSpecialties: async (c) => {
        const response = await axiosClient.get(`/api/v1/specialties/top`)
        return response
    },

    getListDoctorsBySpecialty: async (specialty) => {
        const response = await axiosClient.get(`/api/v1/doctor/specialty/${specialty}`)
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
}

export default doctorApi
