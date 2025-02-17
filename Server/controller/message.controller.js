
import Conversation from "../models/consersation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params
        const senderId = req.user._id
        let conversation = await Conversation.findOne({participants:{
            $all:[senderId,receiverId]
        }})
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        
        // await conversation.save()
        // await newMessage.save()

        //optimisation of above 2 lines
        await Promise.all([conversation.save()],newMessage.save())
         res.status(201).json(newMessage)
        

        //socket
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessages",newMessage)
           
        }



    } catch (error) {
        console.log(("Error in sendMessage controller :",error.message));
        res.status(500).json({error:"inter server Error"})
    }
}
export const getMessages = async (req,res)=>{
    try {
        const{id:userToChatId} = req.params
        const senderId = req.user._id;

        const conversation = await  Conversation.findOne({
            participants:{$all : [ senderId,userToChatId]}
        }).populate("messages")//not reference but actual message

        if(!conversation)return res.status(200).json([])

        
        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log(("Error in sendMessage controller :",error.message));
        res.status(500).json({error:"inter server Error"})
    }
}