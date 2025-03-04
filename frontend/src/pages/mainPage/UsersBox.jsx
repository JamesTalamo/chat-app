import { useChatStore } from '../../store/useChatStore.js'
import React, { useEffect, useState } from 'react'
import UsersSkeleton from '../../components/skeleton/UsersSkeleton.jsx'
import { useAuthStore } from '../../store/useAuthStore.js'



const UsersBox = () => {
    const { users, getUsers, setSelectedUser, isUsersLoading } = useChatStore()

    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        <div className='h-[100%] w-[25%] flex items-center justify-start flex-col gap-[1px] overflow-y-scroll bg-gray-900'>
            {isUsersLoading ? <UsersSkeleton /> : (
                users.map((user) => (
                    <div
                        className='w-[100%] h-[90px] flex items-center justify-center cursor-pointer flex-shrink-0'
                        key={user._id}
                        onClick={() => setSelectedUser({ id: user._id, profile: user.profile, username: user.username })}
                    >
                        <div className="avatar relative">
                            <div className="w-14 rounded-full">
                                <img src={user.profile !== '' ? user.profile : './mypic.jpg'} />
                            </div>
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>

                        <div className='w-[70%] p-[10px] text-white font-bold text-[18px]'>
                            {user.username}
                            <div className={onlineUsers.includes(user._id) ? 'text-green-500 text-[13px]' : 'text-gray-800 text-[13px]'}>
                                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default UsersBox