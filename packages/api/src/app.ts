import express, { Application } from 'express'
import cors, { CorsOptions } from 'cors'
import routes from './routes'

const app:Application = express()

const allowedOrigins = process.env?.API_CORS_ORIGINS || 'http://localhost:3000'
const corsOptions: CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app
