/* eslint-disable no-unused-vars */
export enum USER_ROLE_ENUM {
  ADMIN = 'admin',
  MANAGER = 'manager',
  COMMUNICATION_EXECUTIVE = 'communication executive',
  SALES_EXECUTIVE = 'sales executive',
  OFFICE_EXECUTIVE = 'office executive',
  ACCOUNTANT = 'accountant',
  CLIENT = 'client',
}

export enum USER_GENDER_ENUM {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export const USER_ROLE_ARRAY = Object.values(USER_ROLE_ENUM)
export const USER_GENDER_ARRAY = Object.values(USER_GENDER_ENUM)

export const USER_SEARCH_FIELDS = ['name', 'email', 'phone', 'address']
export const USER_FILTER_FIELDS = ['role', 'isVerified']
