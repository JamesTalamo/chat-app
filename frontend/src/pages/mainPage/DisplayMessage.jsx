// import React from 'react'
// import { useChatStore } from '../../store/useChatStore.js'
// import { useAuthStore } from '../../store/useAuthStore.js'
// import { TiMessages } from "react-icons/ti";

// import { formatPostDate } from '../../lib/date.js';


// const DisplayMessage = () => {

//     const { messages } = useChatStore()
//     const { authUser } = useAuthStore()

//     return (
//         <div className="w-[100%] h-[80%] px-[1%] overflow-y-scroll bg-[#8BABD8] relative bg-[url('/authAssets/bg_print.png')] bg-cover bg-center bg-fixed">
//             {messages.length === 0 ?
//                 <div className='w-[100%] h-[100%] flex items-center justify-center font-bold text-white flex-col text-[18px]'>
//                     <TiMessages />

//                     Start your texting journey with each other!
//                     <div>Send a Message!</div>
//                 </div>
//                 :
//                 (
//                     messages.map((message, index) => (

//                         message.senderId._id === authUser._id ?

//                             < div className="chat chat-end" key={index} >
//                                 <div className="chat-image avatar">
//                                     <div className="w-10 rounded-full">
//                                         <img
//                                             alt={message.senderId.username}
//                                             src={message.senderId.profile !== '' ? message.senderId.profile : './avatar.png'}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="chat-header">

//                                     <time className="text-xs opacity-100 text-white">{`${'me'} ${formatPostDate(message.createdAt)}`}</time>
//                                 </div>
//                                 <div className="chat-bubble">{message.text}</div>
//                             </div >

//                             :

//                             < div className="chat chat-start" key={index} >
//                                 <div className="chat-image avatar">
//                                     <div className="w-10 rounded-full">
//                                         <img
//                                             alt={message.senderId.profile}
//                                             src={message.senderId.profile !== '' ? message.senderId.profile : './avatar.png'}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="chat-header">

//                                     <time className="text-xs opacity-100 text-white">{`${message.senderId.username} ${formatPostDate(message.createdAt)}`}</time>
//                                 </div>
//                                 <div className="chat-bubble">{message.text}</div>
//                             </div >
//                     ))
//                 )}
//         </div >
//     )
// }

// export default DisplayMessage

import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import { TiMessages } from "react-icons/ti";
import { formatPostDate } from '../../lib/date.js';

const DisplayMessage = () => {
    const { messages } = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef(null);

    // Scroll to the bottom when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={messagesEndRef}
            className="w-full h-[80%] px-[1%] overflow-y-scroll bg-[#8BABD8] relative bg-[url('/authAssets/bg_print.png')] bg-cover bg-center bg-fixed"
        >
            {messages.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center font-bold text-white flex-col text-[18px]">
                    <TiMessages />
                    Start your texting journey with each other!
                    <div>Send a Message!</div>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div
                        className={`chat ${message.senderId._id === authUser._id ? 'chat-end' : 'chat-start'}`}
                        key={message._id || index}
                    >
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt={message.senderId.username}
                                    src={message.senderId.profile ? message.senderId.profile : './avatar.png'}
                                />
                            </div>
                        </div>
                        <div className="chat-header">
                            <time className="text-xs opacity-100 text-white">
                                {message.senderId._id === authUser._id
                                    ? `me ${formatPostDate(message.createdAt)}`
                                    : `${message.senderId.username} ${formatPostDate(message.createdAt)}`
                                }
                            </time>
                        </div>
                        <div className="chat-bubble">{message.text}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DisplayMessage;
