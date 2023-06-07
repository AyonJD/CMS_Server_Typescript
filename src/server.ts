import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, successLogger } from './shared/logger'

async function databaseConnection() {
  try {
    await mongoose.connect(config.database_string as string)
    successLogger.info('Database connected successfully')

    app.listen(config.port, () => {
      successLogger.info(`Server is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Error while connecting database: ', error)
  }
}

databaseConnection()
