import mongoose from "mongoose"


const trancectionSchema = new mongoose.Schema({
    amount : {type : Number},
    type : {type : String},
    category : {type : String},
    description : String
})

export const Transactions = mongoose.models.Transactions || mongoose.model("Transactions", trancectionSchema)

// Amount
// Type: Credit or Debit
// Category: (e.g., Food, Transport, Shopping, Salary, etc.)
// Description: (optional)
// 