import mongoose, { Schema } from "mongoose"

const todoModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "not-started",
      enum: ["not-started", "in-progress", "done"],
    },
  },
  {
    timestamps: true,
  }
)

todoModel.methods.remove = async function () {
  try {
    await this.deleteOne();
    console.log("Todo removed successfully");
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

const Todo = mongoose.model("Todo", todoModel)

export default Todo
