import {
  AnalystProductionSortingFunction as SortingFunc,
  Production
} from '../types/types'
import { AnalystProductionSortingEnum as SortingTypes } from '../types/enums'

const alphaAsc: SortingFunc =
  ([a], [b]) => a.toLocaleLowerCase() === b.toLocaleLowerCase() ? 0 : a > b ? 1 : -1

const alphaDesc: SortingFunc =
  ([a], [b]) => a.toLocaleLowerCase() === b.toLocaleLowerCase() ? 0 : a > b ? -1 : 1

const totalAsc: SortingFunc =
  ([, a], [, b]) => a.protocols.length === b.protocols.length
    ? 0
    : a.protocols.length > b.protocols.length
      ? 1
      : -1

const totalDesc: SortingFunc =
  ([, a], [, b]) => a.protocols.length === b.protocols.length
    ? 0
    : a.protocols.length > b.protocols.length
      ? -1
      : 1

const sortData = (data: Production, type: SortingTypes): Production => {
  let sortType: SortingFunc

  switch (type) {
    case SortingTypes.ALPHA_ASC:
      sortType = alphaAsc
      break

    case SortingTypes.ALPHA_DES:
      sortType = alphaDesc
      break

    case SortingTypes.TOTAL_ASC:
      sortType = totalAsc
      break

    case SortingTypes.TOTAL_DES:
      sortType = totalDesc
      break

    default:
      sortType = alphaAsc
      break
  }

  return Object.entries(data)
    .sort(sortType)
    .reduce((arr, curr) => {
      arr[curr[0]] = curr[1]
      return arr
    }, {} as Production)
}

export default sortData
