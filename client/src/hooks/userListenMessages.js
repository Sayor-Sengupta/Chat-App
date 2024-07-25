import { useEffect } from 'react';
import {useSocketContext} from '../Context/SocketContext.jsx'
import useConversation from '../Zustand/useConversation.js';
import notificationSound from '../assets/sounds/notification.mp3'
const userListenMessages = () => {
const  {socket} = useSocketContext();
const {messages,setMessages} = useConversation();

useEffect(()=>{
    socket?.on("newMessages",(newMessage)=>{
        newMessage.shouldShake = true
        const sound  = new Audio(notificationSound)
        sound.play()
        setMessages([...messages,newMessage])
    })
    return ()=> socket?.off("newMessages")
},[socket,setMessages,messages  ])
}

export default userListenMessages