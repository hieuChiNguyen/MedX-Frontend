import axiosClient from '../axiosClient'
import axiosJwt from '../axiosJwt'

const patientApi = {
    createNewPatient: async (input) => {
        const response = await axiosJwt.post('/api/v1/patient/create', input)
        return response
    },

    getAllPatients: async () => {
        const response = await axiosJwt.get(`/api/v1/patients`)
        return response
    },

    getAllProvinces: async () => {
        const response = await axiosClient.get('/api/v1/provinces')
        return response
    },

    getAllDistricts: async (provinceId) => {
        const response = await axiosClient.get(`/api/v1/districts/${provinceId}`)
        return response
    },

    getAllWards: async (districtId) => {
        const response = await axiosClient.get(`/api/v1/wards/${districtId}`)
        return response
    },

    getPatientInformation: async (patientId) => {
        const response = await axiosJwt.get(`/api/v1/information/${patientId}`)
        return response
    },

    uploadAvatar: async (data) => {
        const response = await axiosClient.put('/api/v1/user/update-avatar', data)
        return response
    },
}

export default patientApi
