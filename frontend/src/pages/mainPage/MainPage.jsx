import React from 'react'
import UsersBox from './UsersBox.jsx'
import MessageBox from './MessageBox.jsx'
import { useChatStore } from '../../store/useChatStore.js'

const MainPage = () => {

  const { selectedUser } = useChatStore()


  return (
    <div className='w-full h-[100vh] overflow-x-hidden flex items-center justify-center bg-white'>
      <div className='h-[100%] w-[100%] bg-[#8BABD8] overflow-hidden flex items-center justify-between bg-[#8BABD8] relative bg-[url("/authAssets/bg_print.png")] bg-cover bg-center bg-fixed'>


        <UsersBox />

        {selectedUser && <MessageBox />}

      </div>
    </div>
  )
}

export default MainPage