import { Stage, StageData } from '../types/types'

const normalizeStageData = (data: StageData[]) => {
  const stage: Stage = {}

  data.forEach(row => {
    if (row.stage == null) return null

    if (!(row.stage in stage)) {
      stage[row.stage] = []
    }

    const data = { ...row }
    delete data.stage
    stage[row.stage].push(data)
  })

  return stage
}

export default normalizeStageData
