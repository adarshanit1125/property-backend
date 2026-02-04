import express from "express"
import Property from "../models/Property.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// 🔓 PUBLIC — GET ALL PROPERTIES
router.get("/", async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 })
        res.json(properties)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 🔐 PROTECTED — ADD PROPERTY
router.post("/", protect, async (req, res) => {
    try {
        const property = new Property({
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            image: req.body.image,
        })

        const savedProperty = await property.save()
        res.status(201).json(savedProperty)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// 🔐 PROTECTED — UPDATE PROPERTY
router.put("/:id", protect, async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                location: req.body.location,
                price: req.body.price,
                image: req.body.image,
            },
            { new: true }
        )

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" })
        }

        res.json(updatedProperty)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// 🔐 PROTECTED — DELETE PROPERTY
router.delete("/:id", protect, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)

        if (!property) {
            return res.status(404).json({ message: "Property not found" })
        }

        await property.deleteOne()
        res.json({ message: "Property deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router
