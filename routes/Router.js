import e from "express";
import { Transactions } from "../models/Transaction.js";

export const Router = e.Router()


Router.post("/add-trancection", (req, res) => {
    try {
        const { amount, type, category, description } = req.body || {}
        if (!amount || !type || !category) {
            return res.json({ error: "All feilds are required!" })
        }
        const trancection = new Transactions({
            amount,
            type,
            category,
            description
        })

        trancection.save()
        res.status(201).json({ message: "Trancection created sucessfully!", trancection })
    } catch (error) {
        res.json({ error: error.message || "Something wen't worng!" })
    }
})

Router.get("/trancections", (req, res) => {
    try {
        const trancections = Transactions.find()

        res.status(201).json({ message: "Trancection fetched sucessfully!", trancections })
    } catch (error) {
        res.json({ error: error.message || "Something wen't worng!" })
    }
})

Router.get("/total-balance", (req, res) => {
    try {
        // const balance = Transactions.aggregate([{ "$group": { _id: null, "total_balance": { "$sum": '$amount' } } }])
        const balance = Transactions.find()
        const totalSum = balance.reduce((sum , item) => sum+item, 0)

        res.status(201).json({ message: "Total Balance fetched sucessfully!", totalSum })
    } catch (error) {
        res.json({ error: error.message || "Something wen't worng!" })
    }
})

Router.delete("/delete-trancection", (req, res) => {
    try {
        const { id } = req.body || {}
        if (!id) {
            return res.status(404).json({ error: "Trancections Id is required!" })
        }
        const balance = Transactions.deleteOne({_id : id})

        res.status(201).json({ message: "Trancections deleted sucessfully!", balance })
    } catch (error) {
        res.json({ error: error.message || "Something wen't worng!" })
    }
})

Router.put("/edit-trancection", (req, res) => {
     try {
         const { id } = req.params
         const { amount, type, category, description } = req.body || {}
         if (!id) {
            return res.status(404).json({ error: "Trancections Id is required!" })
        }
        if (!amount || !type || !category) {
            return res.json({ error: "All feilds are required!" })
        }
        const trancection = Transactions.updateOne({_id : id}, {amount, type, category, description})
        // trancection.save()
        res.status(201).json({ message: "Trancection updated sucessfully!" })
    } catch (error) {
        res.json({ error: error.message || "Something wen't worng!" })
    }
})



