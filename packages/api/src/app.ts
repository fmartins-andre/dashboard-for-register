import express, { Application } from 'express'
import routes from './routes'

const app:Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app
