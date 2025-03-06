import React from 'react'
import { useChatStore } from '../../store/useChatStore.js'
import { useAuthStore } from '../../store/useAuthStore.js'
import { TiMessages } from "react-icons/ti";

import { formatPostDate } from '../../lib/date.js';


const DisplayMessage = () => {

    const { messages } = useChatStore()
    const { authUser } = useAuthStore()

    return (
        <div className='w-[100%] h-[80%] px-[3%] overflow-y-scroll'>
            {messages.length === 0 ?
                <div className='w-[100%] h-[100%] flex items-center justify-center font-bold text-white flex-col text-[18px]'>
                    <TiMessages />

                    Start your texting journey with each other!
                    <div>Send a Message!</div>
                </div>
                :
                (
                    messages.map((message, index) => (

                        message.senderId._id === authUser._id ?

                            < div className="chat chat-end" key={index} >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={message.senderId.username}
                                            src={message.senderId.profile !== '' ? message.senderId.profile : './mypic.jpg'}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">

                                    <time className="text-xs opacity-100 text-white">{`${'me'} ${formatPostDate(message.createdAt)}`}</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                            </div >

                            :

                            < div className="chat chat-start" key={index} >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={message.senderId.profile}
                                            src={message.senderId.profile !== '' ? message.senderId.profile : './mypic.jpg'}
                                        />
                                    </div>
                                </div>
                                <div className="chat-header">

                                    <time className="text-xs opacity-100 text-white">{`${message.senderId.username} ${formatPostDate(message.createdAt)}`}</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                            </div >
                    ))
                )}
        </div >
    )
}

export default DisplayMessage