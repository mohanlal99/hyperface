import { configDotenv } from "dotenv"
import mongoose from "mongoose"


export const dbConnect = async ()=>{
    const MONGODB_URL = process.env.MONGODB_URL
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("MongoDB connected!")
    } catch (error) {
        console.log("Db connection fail!")
    }
}