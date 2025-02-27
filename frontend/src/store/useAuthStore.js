import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create((set) => ({
    authUser: null,


    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            let res = await axiosInstance.get('/auth/me')
            set({ authUser: res.data })


        } catch (error) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    registerAuth: async ({ username, password }) => {
        try {
            let res = await axiosInstance.post('/auth/register', { username, password })
            return { message: { success: 'User Registered.' } }
        } catch (error) {

            return { message: { error: error.response?.data?.error } };
        }
    },

    loginAuth: async ({ username, password }) => {
        try {
            let res = await axiosInstance.post('/auth/login', { username, password })
            set({ authUser: res.data })

            return { message: { success: 'User Logged In.' } }

        } catch (error) {
            return { message: { error: error.response?.data?.error } };
        }
    },

    logoutAuth: async () => {
        try {
            let res = await axiosInstance.get('/auth/logout')
            set({ authUser: null })
            return res.data
        } catch (error) {
            console.log(error)
        }
    },

    updateUser: async ({ username, profile }) => {
        console.log('Ito')
        try {
            let res = await axiosInstance.post('/auth/update', { username, profile })
            set({ authUser: res.data })
            set({ isUpdatingProfile: true })
        } catch (error) {
            console.error(error)
            set({ errorMsg: error?.response?.data?.error })
        } finally {
            setTimeout(() => {
                set({ isUpdatingProfile: false })
            }, 1000)
        }
    }


}))