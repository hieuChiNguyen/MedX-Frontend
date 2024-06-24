import axiosJwt from '../axiosJwt'

const receptionistApi = {
    // Admin
    createNewReceptionist: async (input) => {
        const response = await axiosJwt.post('/api/v1/receptionist/create', input)
        return response
    },

    // Admin
    getAllReceptionists: async (gender, province, district, ward) => {
        const response = await axiosJwt.get(`/api/v1/receptionist?gender=${gender}&province=${province}&district=${district}&ward=${ward}`)
        return response
    },

    // Admin
    deleteReceptionist: async (receptionistId) => {
        const response = await axiosJwt.delete(`/api/v1/receptionist/delete/${receptionistId}`)
        return response
    },

    // Admin
    editReceptionist: async (receptionistId, data) => {
        const response = await axiosJwt.patch(`/api/v1/receptionist/edit/${receptionistId}`, data)
        return response
    },
}

export default receptionistApi
