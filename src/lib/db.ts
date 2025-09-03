import mongoose from "mongoose"
import env from "@/env"

const db = {
  name: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
}

const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`

console.log(`Connecting to MongoDB: ${dbURI}`)

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB connection error:", err))
