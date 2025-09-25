import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL
export const dbConnect = async ()=>{
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("Mongodb url!")
    } catch (error) {
        console.log("Db connection fail!")
    }
}