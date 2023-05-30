import { Schema, model } from 'mongoose'
import {
  IUser,
  IUserDetails,
  IUserDetailsModel,
  IUserModel,
} from './user.interface'

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

const userDetailsSchema = new Schema<IUserDetails>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
      type: Date,
    },
    contactNo: {
      type: String,
    },
    emergencyContactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
  },
  { timestamps: true }
)

export const userModel = model<IUser, IUserModel>('User', userSchema)
export const commonUserModel = model<IUserDetails, IUserDetailsModel>(
  'UserDetails',
  userDetailsSchema
)
