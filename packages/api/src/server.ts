import express, { Router, Request, Response } from 'express'

const app = express()
const port: number = 3001

const route = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/', async (request: Request, response: Response): Promise<Response> => {
  return response.json({
    message: 'Hello World!'
  })
})

app.use(route)

try {
  app.listen(port, (): void => {
    console.info(`Express started on port: ${port}.`)
  })
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`)
}
