import axiosClient from '@/app/api/axiosClient'

const patientApi = {
    createNewPatient: async (input) => {
        console.log('Check new data: ', input)
        const response = await axiosClient.post('/api/v1/patient/create-new-patient', input)
        console.log('Response: ', response)
        return response
    },

    getAllPatients: async () => {
        const response = await axiosClient.get('/api/v1/patient/list-patients')
        return response
    },

    getAllProvinces: async () => {
        const response = await axiosClient.get('/api/v1/patient/list-provinces')
        return response
    },

    getAllDistricts: async (provinceCode) => {
        const response = await axiosClient.get(`/api/v1/patient/list-districts/${provinceCode}`)
        return response
    },

    getAllWards: async (districtCode) => {
        const response = await axiosClient.get(`/api/v1/patient/list-wards/${districtCode}`)
        return response
    }
}

export default patientApi
