import React, { useEffect, useState, useRef } from 'react'
import { useChatStore } from '../../store/useChatStore.js'
import MessageSkeleton from '../../components/skeleton/MessageSkeleton.jsx'
import DisplayMessage from './DisplayMessage.jsx'

import { useAuthStore } from '../../store/useAuthStore.js'


const MessageBox = () => {

  const { selectedUser, getMessages, isMessagesLoading, sendMessage, subscribeToMessages, unsubscribeFromMessages, messages } = useChatStore()

  const { onlineUsers } = useAuthStore()


  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages(selectedUser.id)

    subscribeToMessages()

    return () => unsubscribeFromMessages()

  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages])


  const handleSubmit = (e) => {
    
    e.preventDefault()
    if(!message) return 

    sendMessage(message)
    setMessage('')

    setTimeout(() => {
      getMessages(selectedUser.id); // Refetch messages
    }, 500)

  }

  return (
    <div className='w-[75%] h-[100%]   flex items-center justify-center flex-col'>

      <div className='w-[100%] h-[10%] px-[1%] flex items-center justify-start bg-[#FFFFFF]'>
      

        <div className="avatar ">
          <div className="w-10 rounded-full">
            <img src={selectedUser.profile ? selectedUser.profile : './avatar.png'} />
          </div>
        </div>

        <div className='font-bold px-[1%] text-[#011627]'>
          {selectedUser?.username}
        </div>

        <div className={onlineUsers.includes(selectedUser.id) ? 'text-green-500 text-[13px] font-bold' : 'text-gray-800 text-[13px] font-bold'}>
          {onlineUsers.includes(selectedUser.id) ? 'Online' : 'Offline'}
        </div>

      </div>
      {isMessagesLoading ? <MessageSkeleton /> : <DisplayMessage />}

      <div className='w-[100%] h-[10%]'>
        <form className='flex items-center justify-around w-[100%] h-[100%]' onSubmit={handleSubmit}>

          <input type="text" placeholder="Type here" className="input input-bordered w-[90%]" value={message} onChange={(e) => setMessage(e.target.value)} />

          <button className="btn btn-soft" type='submit'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default MessageBox