import mongoose, { Schema, Document, Model } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword?: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  matchPassword?: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema)

export default User
