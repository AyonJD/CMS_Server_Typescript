/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_GENDER_ENUM, USER_ROLE_ENUM } from './user.constant'

export interface IUser {
  role: USER_ROLE_ENUM
  password?: string
  userId: string // Referance
}

// For using static methods in model: Will have to edit later
export interface IUserModel extends Model<IUser> {
  findUserById(id: string): Promise<IUser>
}

// For all the roles:
export interface IUserDetails {
  id: string
  name: {
    firstName: string
    lastName: string
  }
  email: string
  gender?: USER_GENDER_ENUM
  dateOfBirth?: string
  contactNo?: string
  emergencyContactNo?: string
  presentAddress?: string
  permanentAddress?: string
}

// For static methods in model: Will have to edit later
export interface IUserDetailsModel extends Model<IUserDetails> {
  findUserById(id: string): Promise<IUserDetails>
}

export interface ICombinedUser extends IUser, IUserDetails {}
