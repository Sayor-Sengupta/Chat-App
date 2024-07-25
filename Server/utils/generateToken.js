import jwt from "jsonwebtoken";
const generateTokensAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "15d"
    })

     res.cookie("jwt",token,{
        maxAge : 15 * 24 * 60*60*1000,//miliseconds
        httpOnly:true,//prevent xss attacks
        sameSite:"strict",//preent csrf attacks
        secure:process.env.NODE_ENV !== "development"
        
    })

}
export default generateTokensAndSetCookie;