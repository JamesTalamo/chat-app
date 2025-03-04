import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast'

import { useAuthStore } from './useAuthStore.js'

export const useChatStore = create((set, get) => ({
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

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()

        try {
            let res = await axiosInstance.post(`/message/send/${selectedUser.id}`, { text: messageData })


        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, messages} = get()
        if (!selectedUser) return

        const socket = useAuthStore.getState().socket;
        if (!socket) {
            alert("Socket is not connected yet!");
            return;
        }

        console.log(messages)

        socket.on("newMessage", (newMessage) => {
            console.log(newMessage)
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser.id;
            if (!isMessageSentFromSelectedUser) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });


    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off('newMessage')
    },

    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser })
}))