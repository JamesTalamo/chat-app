import React from 'react'
import UsersBox from './UsersBox.jsx'
import MessageBox from './MessageBox.jsx'
import { useChatStore } from '../../store/useChatStore.js'

const MainPage = () => {

  const { selectedUser } = useChatStore()


  return (
    <div className='w-full h-[100vh] overflow-x-hidden flex items-center justify-center bg-gray-600'>
      <div className='h-[80%] w-[70%] bg-gray-800 overflow-hidden flex items-center justify-between'>
        <UsersBox />
       
        {selectedUser && <MessageBox />}

      </div>
    </div>
  )
}

export default MainPage