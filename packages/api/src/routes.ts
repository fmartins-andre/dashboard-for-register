import { Router } from 'express'
import getProductionData, { ProtocolData } from './data/getAnalystProductionData'
import getStagesData, { StageData } from './data/getStagesData'
import normalizeAnalystProductionData from './services/normalizeAnalystProductionData'
import normalizeStageData from './services/normalizeStageData'

const routes = Router()

routes.get('/api/v1/analysts/production', async (request, response) => {
  const data = await getProductionData()
  const normalized = normalizeAnalystProductionData(data as ProtocolData[])

  response.json(normalized)
})

routes.get('/api/v1/stages/production', async (request, response) => {
  const data = await getStagesData()
  const normalized = normalizeStageData(data as StageData[])

  response.json(normalized)
})

export default routes
