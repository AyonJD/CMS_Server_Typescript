import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// Router imports
import userRouter from './app/modules/user/user.route'
import { AUTH_URL } from './app/utils/routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Route is working!')
})

// Application routes
app.use(`${AUTH_URL}/user`, userRouter)

export default app
