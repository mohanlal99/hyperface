import e from "express";
import { Transactions } from "../models/Transaction.js";

export const Router = e.Router()


Router.post("/add-transaction", async (req, res) => {
    try {
        const { amount, type, category, description } = req.body || {}
        if (!amount || !type || !category) {
            return res.status(500).json({ error: "All feilds are required!" })
        }
        const transaction = new Transactions({
            amount,
            type,
            category,
            description
        })

        await transaction.save()
        res.status(201).json({ message: "Trancection created sucessfully!", transaction })
    } catch (error) {
        res.status(500).json({ error: error.message || "Something wen't worng!" })
    }
})

Router.get("/trancections", async (req, res) => {
    try {
        const trancections = await Transactions.find()

        res.status(201).json({ message: "Trancection fetched sucessfully!", trancections })
    } catch (error) {
        res.status(500).json({ error: error.message || "Something wen't worng!" })
    }
})

Router.get("/total-balance", async (req, res) => {
    try {
        const balance = await Transactions.aggregate([{ "$group": { _id: null, total_balance: { $sum: "$amount" } } }])
        // const balance = await Transactions.find()
        const totalSum =  balance[0]?.total_balance || 0

        res.status(201).json({ message: "Total Balance fetched sucessfully!", balance : totalSum })
    } catch (error) {
        res.status(500).json({ error: error.message || "Something wen't worng!" })
    }
})

Router.delete("/delete-trancection", async (req, res) => {
    try {
        const { id } = req.body || {}
        if (!id) {
            return res.status(404).json({ error: "Trancections Id is required!" })
        }
        const deleted = await Transactions.deleteOne({ _id: id })

        res.status(201).json({ message: "Trancections deleted sucessfully!", deleted })
    } catch (error) {
        res.status(500).json({ error: error.message || "Something wen't worng!" })
    }
})

Router.put("/edit-transaction/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { amount, type, category, description } = req.body || {}
        if (!id) {
            return res.status(404).json({ error: "Transaction Id is required!" })
        }
        if (!amount || !type || !category) {
            return res.status(500).json({ error: "All feilds are required!" })
        }
        const transaction = await Transactions.updateOne({ _id: id }, { amount, type, category, description })
        
        res.status(201).json({ message: "Transaction updated sucessfully!" })
    } catch (error) {
        res.status(500).json({ error: error.message || "Something wen't worng!" })
    }
})



