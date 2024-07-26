import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import  io  from "socket.io-client";
export const SocketContext = createContext();
export const useSocketContext = ()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children})=>{
const [ socket,setSocket] = useState(null);
const [ onlineUser,SetOnlineUser] =useState([])
const {authUser} = useAuthContext();


useEffect(()=>{
    if(authUser){
        const socket = io("https://chat-app-t9pg.onrender.com",{
            query:{ userId: authUser._id}
        });
        setSocket(socket);
        socket.on('getOnlineUsers',(users)=>{
                SetOnlineUser(users)
        })
        return ()=> socket.close()
    }else{
        if(socket){
            socket.close();
            setSocket(null)
        }
    }
},[authUser])
    return (
        <SocketContext.Provider value={{socket,onlineUser}}>
            {children}
        </SocketContext.Provider>
    )
}