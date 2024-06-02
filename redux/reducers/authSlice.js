import { createSlice } from '@reduxjs/toolkit'
import { RoleEnum } from '../../utils/enum/role.enum'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        id: '',
        email: '',
        username: '',
        role: null,
        doctorId: '',
        doctorStatus: '',
        doctorPosition: ''
    },
    reducers: {
        login: (state, action) => {
            if (action.payload.role === RoleEnum.DOCTOR) {
                state.loggedIn = true
                state.id = action.payload.id
                state.email = action.payload.email
                state.username = action.payload.username
                state.role = action.payload.role
                state.doctorId = action.payload.doctorId,
                state.doctorStatus = action.payload.doctorStatus,
                state.doctorPosition = action.payload.doctorPosition
            } else {
                state.loggedIn = true
                state.id = action.payload.id
                state.email = action.payload.email
                state.username = action.payload.username
                state.role = action.payload.role
            }
        },
        logout: (state) => {
            state.loggedIn = false
            state.id = ''
            state.email = ''
            state.username = ''
            state.role = null
            state.doctorId = '',
            state.doctorStatus = '',
            state.doctorPosition = ''
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer