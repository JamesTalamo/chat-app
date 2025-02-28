import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { toast } from 'react-hot-toast'

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
            toast.success('User registered')
        } catch (error) {
            toast.error(error.response?.data?.error)

        }
    },

    loginAuth: async ({ username, password }) => {
        try {
            let res = await axiosInstance.post('/auth/login', { username, password })
            set({ authUser: res.data })

            toast.success('User Logged In')

        } catch (error) {
            toast.error(error.response?.data?.error)
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
        try {
            let res = await axiosInstance.post('/auth/update', { username, profile })
            set({ authUser: res.data })
            set({ isUpdatingProfile: true })
        } catch (error) {
            toast.error(error)
        } finally {
            setTimeout(() => {
                set({ isUpdatingProfile: false })
            }, 1000)
        }
    }


}))