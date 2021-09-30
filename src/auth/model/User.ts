import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  username: string
  email: string
  role: string
  createdAt: Date
  password?: string
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'A user must have a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have a email'],
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

const User: mongoose.Model<IUser> = mongoose.model('User', userSchema)

export default User
