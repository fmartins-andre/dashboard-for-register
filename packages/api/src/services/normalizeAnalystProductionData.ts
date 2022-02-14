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
    if (row.analyst == null) return null

    const data = { ...row }
    delete data.analyst
    production[row.analyst.toLocaleLowerCase()].protocols.push(data)
  })

  return production
}

export default normalizeAnalystProductionData
