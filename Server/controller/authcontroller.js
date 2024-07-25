import User from "../models/user.model.js";
import  bcrypt from "bcryptjs"
import generateTokensAndSetCookie from "../utils/generateToken.js";
export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password dont match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exist" });
    }

    //HashPasswordHere
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password,salt);

    //pic

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
     const newUser = new User({
      fullName,
      username,
      password:hasedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

   if (newUser){
    //generate jwt token
    generateTokensAndSetCookie(newUser._id,res)
    await newUser.save();
    return res
      .status(201)
      .json({ _id: newUser._id, fullname: newUser.fullName ,userProfile:newUser.profilePic});
   }
   else{
    return res.status(400).json({error:"invalid user data"})
   }
  } catch (error) {
    console.log("error found in signup", error.message);
    return res.status(500).json({error:"internal server error"})
  }
};
export const login = async (req, res) => {
  try {
    const {username,password} = req.body
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")
    if (!user || !isPasswordCorrect){
      return res.status(400).json({error:"invalid username or password"})

    }
    generateTokensAndSetCookie(user._id,res)
    res.status(200).json({
      _id: user._id,
      fullName:user.fullName,
      username:user.username,
      profilePic:user.profilePic
    })

     
    
  } catch (error) {
    console.log("error found in login", error.message);
    return res.status(500).json({error:"internal server error"})
  }
};
export const logout = async(req, res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out"})
    
  } catch (error) {
    console.log("error found in login", error.message);
    return res.status(500).json({error:"internal server error"})
  }
};
