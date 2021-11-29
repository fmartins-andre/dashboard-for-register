
import type { Production, ProtocolData } from '../data/getAnalystProductionData'

const normalizeAnalystProductionData = (data: ProtocolData[]) => {
  const production: Production = {}

  data.forEach(row => {
    if (row.analyst == null) return null

    if (!(row.analyst in production)) {
      production[row.analyst] = []
    }

    const data = { ...row }
    delete data.analyst
    production[row.analyst].push(data)
  })

  return production
}

export default normalizeAnalystProductionData
