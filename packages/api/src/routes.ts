import { Router } from 'express'
import ProductionController from './controllers/ProductionController'

const routes = Router()

routes.get('/api/v1/analysts/production', ProductionController.listAll)

export default routes
