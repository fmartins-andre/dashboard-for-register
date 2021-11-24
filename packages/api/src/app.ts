import express, { Application } from 'express'
import cors, { CorsOptions } from 'cors'
import routes from './routes'

const app:Application = express()

const allowedOrigins = process.env?.API_CORS_ORIGINS?.split(',') || ['http://localhost:3000']
console.log('::: API: CORS Allowed Origins: ', allowedOrigins)

const corsOptions: CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app
