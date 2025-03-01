import { useChatStore } from '../../store/useChatStore.js'
import React, { useEffect, useState } from 'react'
import UsersSkeleton from '../../components/skeleton/UsersSkeleton.jsx'



const UsersBox = () => {
    const { users, getUsers, setSelectedUser, isUsersLoading } = useChatStore()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <div className='h-[100%] w-[25%] flex items-center justify-start flex-col gap-[1px] overflow-y-scroll '>
            {isUsersLoading ? <UsersSkeleton /> : (
                users.map((user) => (
                    <div className='w-[100%] h-[90px]  flex items-center justify-center cursor-pointer flex-shrink-0' key={user._id} onClick={() => { setSelectedUser({ id: user._id, profile: user.profile, username: user.username }) }}>

                        <div className="avatar">
                            <div className="w-14 rounded-full">
                                <img src={user.profile !== '' ? user.profile : './mypic.jpg'} />
                            </div>
                        </div>

                        <div className='w-[70%] p-[10px] text-white font-bold text-[18px]'>
                            {user.username}
                        </div>

                    </div>
                ))
            )}
        </div>
    )
}

export default UsersBox