import mongoose from 'mongoose'
import {
  IGenericErrorResponse,
  IGenericErrorMessage,
} from '../interfaces/errorInterface'

const handleMongooseValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        message: el.message,
        path: el.path,
      }
    }
  )

  const statusCode = 400
  return {
    status: 'false',
    statusCode,
    message: 'Validation Error',
    errorMessages,
  }
}

export default handleMongooseValidationError
