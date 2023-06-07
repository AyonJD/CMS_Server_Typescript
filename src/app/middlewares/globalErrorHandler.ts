import { IGenericErrorMessage } from './../../interfaces/errorInterface'
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { errorLogger } from '../../shared/logger'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (config.env === 'development') {
    console.log(error.stack)
  } else {
    errorLogger.error(error)
  }

  const status = false
  let statusCode = error.statusCode || 500
  let message = error.message || 'Internal Server Error'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = [{ message: error.message, path: '' }]
  } else if (error instanceof Error) {
    message = error.message
    errorMessages = [{ message: error.message, path: '' }]
  }

  res.status(statusCode).json({
    status,
    message,
    errorMessages,
    stack: config.env === 'development' ? error.stack : '',
  })
}

export default globalErrorHandler
