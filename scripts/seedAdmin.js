import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import Admin from "../models/Admin.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, "../.env") })

await mongoose.connect(process.env.MONGO_URI)

const email = "admin@yourcompany.com"
const password = "Admin@123" // change later
const hash = await bcrypt.hash(password, 10)

await Admin.deleteMany({})
await Admin.create({ email, password: hash })

console.log("Admin created:", email)
process.exit(0)
