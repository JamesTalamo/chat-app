import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast'

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        try {
            set({ isUsersLoading: true })
            let res = await axiosInstance.get('/message/users')
            set({ users: res.data })
            set({ isUsersLoading: false })

        } catch (error) {
            console.warn(error)
            toast.error(error.response.data.message)
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true })
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data })

            set({ isMessagesLoading: false })
        } catch (error) {
            console.warn(error)
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser })
}))