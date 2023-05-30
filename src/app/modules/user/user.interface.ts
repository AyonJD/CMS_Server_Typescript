import { Model } from 'mongoose'

export interface IUser {
  id: string
  role: string
  password: string
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
  gender?: string
  dateOfBirth?: Date
  contactNo?: string
  emergencyContactNo?: string
  presentAddress?: string
  permanentAddress?: string
}

// For static methods in model: Will have to edit later
export interface IUserDetailsModel extends Model<IUserDetails> {
  findUserById(id: string): Promise<IUserDetails>
}
