import http from 'http'
import dotenv from 'dotenv'
import path from 'path'
import app from './app'

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') })

const port = process.env.API_PORT ?? 5000

try {
  http.createServer(app)
    .listen(port, () => {
      console.error(`::: API: HTTP server started on port: ${port}`)
    })
} catch (error: any) {
  console.error(`::: API: Error occurred: ${error.message}`)
}
