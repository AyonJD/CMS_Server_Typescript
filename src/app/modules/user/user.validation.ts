import { z } from 'zod'
import { UserConstant } from '../../../constant/user.constant'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...UserConstant.userRoles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string().optional(),
    //   As the user id is auto generated, we don't need to validate it at the route level
  }),
})

const createUserDetailsZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: 'First name is required',
        })
        .min(2, {
          message: 'First name must be at least 2 characters long',
        }),
      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .min(2, {
          message: 'Last name must be at least 2 characters long',
        }),
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    gender: z
      .enum([...UserConstant.userGender] as [string, ...string[]])
      .optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
  }),
})

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    userId: z.string().optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters long',
      }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  createUserDetailsZodSchema,
  loginUserZodSchema,
}
