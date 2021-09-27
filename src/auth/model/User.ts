import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)

export default User
