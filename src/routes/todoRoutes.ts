import express, { Router } from "express"
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
} from "@/controllers/todoController"
import { protect } from "@/middleware/authMiddleware"

const router: Router = express.Router()

router.route("/").post(protect, createTodo).get(protect, getTodos)
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo)

export default router
