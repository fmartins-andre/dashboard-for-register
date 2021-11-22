import http from 'http'
import path from 'path'
import app from './app'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(process.cwd(), '../../.env') })
}

const port = process.env?.API_PORT ?? 5000

try {
  http.createServer(app)
    .listen(port, () => {
      console.error(`HTTP server started on port: ${port}`)
    })
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`)
}
