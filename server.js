import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/db.js"
import propertyRoutes from "./routes/propertyRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

// 🔹 Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 🔹 Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") })

const app = express()

// 🔹 Connect to MongoDB
connectDB()

// 🔹 Middlewares
app.use(cors())
app.use(express.json({ limit: "10mb" })) // allow base64 images

// 🔹 Routes
app.use("/api/properties", propertyRoutes)

// 🔹 Test Route
app.get("/", (req, res) => {
    res.send("Backend + MongoDB running 🚀")
})

// 🔹 Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
//
app.use("/api/admin", adminRoutes)
