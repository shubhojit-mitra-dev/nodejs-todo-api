import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "@/models/userModel"
import { NextFunction, Response, RequestHandler } from "express"
import env from "@/env"
import { ProtectedRequest } from "@/types/api"

const protect: RequestHandler = asyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string }

      req.user = await User.findById(decoded.userId).select("-password")

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

export { protect }
