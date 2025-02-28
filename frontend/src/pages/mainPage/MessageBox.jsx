import React, { useEffect, useState } from 'react'
import { useChatStore } from '../../store/useChatStore.js'

const MessageBox = () => {

  const { selectedUser, getMessages } = useChatStore()

  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessages(selectedUser.id)
  }, [selectedUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className='w-[75%] h-[100%]   flex items-center justify-center flex-col'>
      <div className='w-[100%] h-[10%]  flex items-center justify-start'>

        <div className="avatar px-[3%]">
          <div className="w-10 rounded-full">
            <img src={selectedUser.profile ? selectedUser.profile : './mypic.jpg'} />          </div>
        </div>

        <div className='font-bold text-white'>
          {selectedUser?.username}
        </div>

      </div>
      <div className='w-[100%] h-[80%] bg-green-500'>

      </div>
      <div className='w-[100%] h-[10%]'>
        <form className='flex items-center justify-around w-[100%] h-[100%]' onSubmit={handleSubmit}>

          <input type="text" placeholder="Type here" className="input input-bordered w-[90%]" />

          <button className="btn btn-active" type='submit'>Default</button>

        </form>
      </div>
    </div>
  )
}

export default MessageBox