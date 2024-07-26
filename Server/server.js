import path from "path"
import express from "express"
import dotenv from "dotenv"
import authRoutes  from "./routes/authroues.js"
import messageRoutes from "./routes/MessageRoutes.js"
import connectToMongo from "./db/connectToMongo.js";
import userRoutes from "./routes/userroutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { app, server } from "./socket/socket.js";
dotenv.config()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()
const corsOptions = {
    
    origin: 'https://chat-app-t9pg.onrender.com', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  };

// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());// to parse json , from req.body
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.use(express.static(path.join(__dirname,"/client/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

// app.get("/",(req,res)=>{
//     res.send("halso")
// })



server.listen(PORT,()=>{
    connectToMongo()
console.log(`server is running ${PORT}`)})