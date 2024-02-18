import axiosClient from '@/app/api/axiosClient'

const doctorApi = {
    createNewDoctor: async (input) => {
        console.log('Check new data: ', input)
        const response = await axiosClient.post('/api/v1/doctor/create-new-doctor', input)
        console.log('Response: ', response)
        return response
    },

    getAllDoctors: async () => {
        const response = await axiosClient.get('/api/v1/doctor/list-doctors')
        return response
    },

    getDoctorById: async (doctorId) => {
        const response = await axiosClient.get(`/api/v1/doctor/${doctorId}`)
        return response
    },

    getAllSpecialties: async (currentPage, itemsPerPage) => {
        const response = await axiosClient.get(
            `/api/v1/doctor/list-specialties?page=${currentPage}&size=${itemsPerPage}`
        )
        return response
    },

    getListDoctorsBySpecialty: async (specialty) => {
        const response = await axiosClient.get(`/api/v1/doctor/specialty/${specialty}`)
        console.log('check ressponse: ', response)
        return response
    }
}

export default doctorApi
