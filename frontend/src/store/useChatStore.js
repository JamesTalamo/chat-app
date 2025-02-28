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
            let res = await axiosInstance.get('/message/users')
            set({ users: res.data })
        } catch (error) {
            console.warn(error)
            toast.error(error.response.data.message)
        }
    },

    getMessages: async (userId) => {
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data })

        } catch (error) {
            console.warn(error)
            toast.error(error.response.data.message)
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser })
}))