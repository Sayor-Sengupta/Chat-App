import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import useConversation from '../../Zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
 const {authUser}=useAuthContext();
  const {selectedConversation}=  useConversation()
//   console.log("selected",selectedConversation);
   const formmatedTime = extractTime(message.createdAt)
//    console.log(formmatedTime);
console.log('Auth User:', authUser);
console.log('Message:', message);

   const fromMe = message.senderId === authUser._id;
//    console.log(fromMe);

   const chatClassName = fromMe?"chat-end":"chat-start"
   const profilePic = fromMe?authUser.profilePic:selectedConversation?.profilePic;
   const bubbleBgColor = fromMe?'bg-blue-500':"";
   const shakeClass = message.shouldShake? "shake" :  ""
  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src={profilePic} alt="" />
            </div>
        </div>
        <div>
            <div className={`chat chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opactiy-50 text-xs flex gap-1 items-center'>{formmatedTime} </div>
        </div>
    </div>
  )
}

export default Message