import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  database_string: process.env.DATABASE_STRING,
  access_token: process.env.ACCESS_TOKEN,
  app_email: process.env.APP_EMAIL,
  app_password: process.env.APP_PASSWORD,
}
