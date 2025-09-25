import express from "express"
import { Router } from "./routes/Router.js"
import { configDotenv } from "dotenv"
import { dbConnect } from "./utils/db.js"

configDotenv()
const app = express()
app.use(express.json())


app.get("/", (req, res)=>{
  res.send("This is Expense Tracker backend application where users can add, view, edit, and manage their credit and debit transactions. ")  
})

app.use("/", Router)

app.listen(5050, async ()=>{
    await dbConnect()
    console.log("app is runing on http://localhost:5050")
})