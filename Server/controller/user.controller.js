import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      console.log('Logged In User ID:', loggedInUserId); // Debug log
  
      const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
      console.log(filteredUsers);
  
      if (!filteredUsers.length) {
        console.log('No users found'); // Debug log
      }
  
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSideBar:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  