import { Analyst, Production, ProtocolData } from '../types/types'

const normalizeAnalystProductionData = (data: ProtocolData[], analysts: Analyst[]) => {
  const production: Production = {}

  if (analysts?.length) {
    analysts.forEach(row => {
      production[row.username.toLocaleLowerCase()] = {
        hasTag: row.hasTag,
        isClerk: row.isClerk,
        isSupervisor: row.isSupervisor,
        protocols: []
      }
    })
  }

  data.forEach(row => {
    try {
      if (
        row.analyst == null ||
        !Object.prototype.hasOwnProperty.call(production, row.analyst.toLocaleLowerCase())
      ) { return null }

      const data = { ...row }
      delete data.analyst
      production[row.analyst.toLocaleLowerCase()]?.protocols.push(data)
    } catch (error) {
      console.error(error)
    }
  })

  return production
}

export default normalizeAnalystProductionData
