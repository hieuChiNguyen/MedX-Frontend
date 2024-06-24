import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const patientApi = {
    // Admin, Receptionist
    createNewPatient: async (input) => {
        const response = await axiosJwt.post('/api/v1/patient/create', input)
        return response
    },

    // Admin, Receptionist
    getAllPatients: async (gender, province, district, ward) => {
        const response = await axiosJwt.get(`/api/v1/patients?gender=${gender}&province=${province}&district=${district}&ward=${ward}`)
        return response
    },

    // Any roles
    getAllProvinces: async () => {
        const response = await axiosClient.get('/api/v1/provinces')
        return response
    },

    // Any roles
    getAllDistricts: async (provinceId) => {
        const response = await axiosClient.get(`/api/v1/districts/${provinceId}`)
        return response
    },

    // Any roles
    getAllWards: async (districtId) => {
        const response = await axiosClient.get(`/api/v1/wards/${districtId}`)
        return response
    },

    getPatientInformation: async (patientId) => {
        const response = await axiosJwt.get(`/api/v1/information/${patientId}`)
        return response
    },

    uploadAvatar: async (data) => {
        const response = await axiosClient.patch('/api/v1/user/update-avatar', data)
        return response
    },

    getExamResult: async (appointmentId) => {
        const response = await axiosJwt.get(`/api/v1/history/${appointmentId}`)
        return response
    },

    shareAppointmentResult: async (data) => {
        const response = await axiosJwt.post(`/api/v1/history/share`, data)
        return response
    },

    // Patient
    sendFeedback: async (data) => {
        const response = await axiosJwt.post(`/api/v1/email/feedback`, data)
        return response
    },
}

export default patientApi
