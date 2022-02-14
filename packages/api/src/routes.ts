import { Router } from 'express'
import getProductionData from './data/getAnalystProductionData'
import getAnalysts from './data/getAnalysts'
import getStagesData from './data/getStagesData'
import normalizeAnalystProductionData from './services/normalizeAnalystProductionData'
import normalizeStageData from './services/normalizeStageData'
import { Analyst, ProtocolData, StageData } from './types/types'

const routes = Router()

routes.get('/api/v1/analysts/production', async (request, response) => {
  const analysts = await getAnalysts() as Analyst[]
  const production = await getProductionData() as ProtocolData[]
  const normalized = normalizeAnalystProductionData(production, analysts)

  response.json(normalized)
})

routes.get('/api/v1/stages/production', async (request, response) => {
  const data = await getStagesData() as StageData[]
  const normalized = normalizeStageData(data)

  response.json(normalized)
})

export default routes
