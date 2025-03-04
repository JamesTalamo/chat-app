import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'

const socketUrl = import.meta.env.VITE_BACKEND_URL


export const useAuthStore = create((set, get) => ({
    authUser: null,


    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    onlineUsers: [],

    isCheckingAuth: true,

    socket: null,

    checkAuth: async () => {
        try {
            let res = await axiosInstance.get('/auth/me')
            set({ authUser: res.data })
            get().connectSocket()


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
            get().connectSocket()

        } catch (error) {
            toast.error(error.response?.data?.error)

        }
    },

    loginAuth: async ({ username, password }) => {
        try {
            let res = await axiosInstance.post('/auth/login', { username, password })
            set({ authUser: res.data })

            toast.success('User Logged In')
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.error)
        }
    },

    logoutAuth: async () => {
        try {
            let res = await axiosInstance.get('/auth/logout')
            set({ authUser: null })
            get().disconnectSocket()

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
    },

    connectSocket: async () => {
        const { authUser, socket } = get()

        if (authUser !== null) {
            const socket = io(socketUrl, {
                query: {
                    userId: authUser._id
                }


            })
            socket.connect()

            set({ socket: socket })
            socket.on("getOnlineUsers", (users) => {
                set({ onlineUsers: users })
            })
        }

    },
    disconnectSocket: async () => {
        const { authUser, socket } = get()

        if (authUser === null && socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }

}))