import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

// Router imports
import { UserRoute } from './app/modules/user/user.route'
import { AUTH_URL } from './app/utils/routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
// app.get('/', (req, res, next) => {
//   next('dfgf')
// })

// Application routes
app.use(`${AUTH_URL}/user`, UserRoute)

// Global error handler
app.use(globalErrorHandler)

export default app
