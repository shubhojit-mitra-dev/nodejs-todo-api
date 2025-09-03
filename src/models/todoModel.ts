import mongoose, { Model, Schema } from "mongoose"

export interface ITodo {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: STATUS;
}

export enum STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export const DOCUMENT_NAME = "Todo"
export const COLLECTION_NAME = "todos"

const todoModel = new Schema<ITodo>(
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
      default: STATUS.NOT_STARTED,
      enum: Object.values(STATUS),
    },
  },
  {
    timestamps: true,
  }
)

const Todo: Model<ITodo> = mongoose.model<ITodo>(DOCUMENT_NAME, todoModel, COLLECTION_NAME)

export default Todo
