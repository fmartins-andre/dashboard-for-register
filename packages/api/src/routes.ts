import { Router } from 'express'
import getDatabaseData from './data/getDatabaseData'
import transformData, { Data } from './services/transformData'

const routes = Router()

routes.get('/api/v1/analysts/production', async (request, response) => {
  const data = await getDatabaseData()
  const transformed = transformData(data as Data[])

  response.json(transformed)
})

export default routes
