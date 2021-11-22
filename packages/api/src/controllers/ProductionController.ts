import { Request, Response } from 'express'

const listAll = async (request: Request, response: Response): Promise<Response> => {
  return response.json({
    message: 'Hello World!'
  })
}

const ProductionController = {
  listAll
}

export default ProductionController
