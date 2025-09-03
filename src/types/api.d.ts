import { Request } from "express"
import { UserDoc, UserModel } from "@/models/userModel"

declare interface ProtectedRequest extends Request {
  user?: any
}