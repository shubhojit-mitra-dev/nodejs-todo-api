import env from '@/env'
import todoRoutes from "@/routes/todoRoutes"
import userRoutes from "@/routes/userRoutes"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { type Express } from 'express'
import { errorHandler } from "@/middleware/errorMiddleware"

export const app: Express = express();

app.use(cors({ origin: env.CORS_URL, optionsSuccessStatus: 200 }))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users", userRoutes)
app.use("/api/todo", todoRoutes)

app.use(errorHandler)
