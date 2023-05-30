import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        'admin',
        'manager',
        'communication executive',
        'sales executive',
        'office excutive',
        'accountant',
        'client',
      ],
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const userModel = model<IUser, IUserModel>('User', userSchema)

export default userModel
