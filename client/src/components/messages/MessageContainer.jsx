import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../../Zustand/useConversation.js'
import { useAuthContext } from '../../Context/AuthContext.jsx'
const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation}=useConversation()
  useEffect(()=>{
    //cleanup - when user logouts
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <div className='md:min-w-[450px] w-lg flex flex-col'>
      {!selectedConversation?(<NoChatSelected/>):(      <>
      <div className=' bg-slate-500 px-4 p-2 mb-2'>
      <span className=' label-text'>To:</span>{" "}
      <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>

      </div>

      <Messages/>
      <MessageInput/>

      </>)}
    </div>
  )
}
 
export default MessageContainer



const NoChatSelected = ()=>{
  const {authUser} = useAuthContext()
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-kg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
          <p>welcome {authUser.fullName}</p>
          <p>select a chat to Start messaging</p>
          <TiMessages className='text-3xl md:text-6xl text-center'/>
        </div>
      </div>
    )
}