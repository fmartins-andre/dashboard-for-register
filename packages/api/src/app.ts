import express, { Router, Request, Response } from 'express'

const app = express()

const route = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/api/v1/analysts/production', async (request: Request, response: Response): Promise<Response> => {
  return response.json({
    message: 'Hello World!'
  })
})

app.use(route)

export default app
