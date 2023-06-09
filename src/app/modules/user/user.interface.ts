import { Model } from 'mongoose'

export interface IUser {
  role: string
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
  gender?: string
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

// For login------------
export interface ILoginUser {
  userId?: string
  email?: string
  password: string
}

// For sending response-------------
export interface IUserResponse {
  accessToken: string
  result: IUser
}

// For jwt payload-------------
export interface IJwtPayload {
  userId: string
  email?: string
}
