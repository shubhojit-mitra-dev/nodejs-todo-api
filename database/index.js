import mongoose from "mongoose"
import { db } from "../config.js"

const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`

console.log(`Connecting to MongoDB: ${dbURI}`)

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB connection error:", err))
