import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/useChatStore.js'
import MessageSkeleton from '../../components/skeleton/MessageSkeleton.jsx'
import DisplayMessage from './DisplayMessage.jsx'

import { useAuthStore } from '../../store/useAuthStore.js'


const MessageBox = () => {

  const { selectedUser, getMessages, isMessagesLoading, sendMessage, messages } = useChatStore()

  const { onlineUsers } = useAuthStore()


  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages(selectedUser.id)
  }, [selectedUser])

  const handleSubmit = (e) => {
    e.preventDefault()

    sendMessage(message)
    setMessage('')
  }

  return (
    <div className='w-[75%] h-[100%]   flex items-center justify-center flex-col'>
      <div className='w-[100%] h-[10%]  flex items-center justify-start bg-gray-900'>

        <div className="avatar px-[3%]">
          <div className="w-10 rounded-full">
            <img src={selectedUser.profile ? selectedUser.profile : './mypic.jpg'} />
          </div>
        </div>

        <div className='font-bold text-white pr-[15px]'>
          {selectedUser?.username}
        </div>
        
        <div className={onlineUsers.includes(selectedUser._id) ? 'text-green-500 text-[13px] font-bold' : 'text-gray-800 text-[13px] font-bold'}>
          {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
        </div>

      </div>
      {isMessagesLoading ? <MessageSkeleton /> : <DisplayMessage />}

      <div className='w-[100%] h-[10%]'>
        <form className='flex items-center justify-around w-[100%] h-[100%]' onSubmit={handleSubmit}>

          <input type="text" placeholder="Type here" className="input input-bordered w-[90%]" value={message} onChange={(e) => setMessage(e.target.value)} />

          <button className="btn btn-active" type='submit'>Submit</button>

        </form>
      </div>
    </div>
  )
}

export default MessageBox