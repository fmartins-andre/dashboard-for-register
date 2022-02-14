import {
  Production,
  AnalystProductionFiltering as Filters
} from '../types/types'
import { AnalystProductionFilteringEnum as FilterTypes } from '../types/enums'

const filterData = (data: Production, types: Filters[]): Production => {
  const hasClerk = types.some(t => t === FilterTypes.CLERK)
  const hasSupervisor = types.some(t => t === FilterTypes.SUPERVISOR)
  const hasTag = types.some(t => t === FilterTypes.TAG)

  if (!types?.length || (!hasClerk && !hasSupervisor && !hasTag)) return data

  return Object.entries(data)
    .filter(([, value]) => (
      (hasClerk && value.isClerk) ||
      (hasSupervisor && value.isSupervisor) ||
      (hasTag && value.hasTag)
    ))
    .reduce((arr, curr) => {
      arr[curr[0]] = curr[1]
      return arr
    }, {} as Production)
}

export default filterData
