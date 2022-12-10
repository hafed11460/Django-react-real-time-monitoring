import { createSlice } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'))
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginUser(state,{payload}){
            state.user = payload.user
            localStorage.setItem('user', JSON.stringify(payload.user))
            localStorage.setItem('token', JSON.stringify(payload.token.access))

        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {

    }
})

export const {
    setLoginUser,
    logout,
}= authSlice.actions

export default authSlice.reducer