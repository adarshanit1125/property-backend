import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Admin from "../models/Admin.js"

const router = express.Router()

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(401).json({ message: "Invalid credentials" })

    const ok = await bcrypt.compare(password, admin.password)
    if (!ok) return res.status(401).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.json({ token })
})

export default router
