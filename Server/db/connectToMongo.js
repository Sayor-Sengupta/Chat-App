import mongoose from "mongoose";
const connectToMongo = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("connected to MongoDb");
    } catch (error) {
        console.log("error Connecting MongoDb",error.message);
    }
};

export default connectToMongo