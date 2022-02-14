import {
  AnalystProductionFilteringEnum,
  AnalystProductionSortingEnum
} from './enums'

export type Analyst = {
  username: string
  isSupervisor: boolean
  isClerk: boolean
  hasTag: boolean
}

export type ProtocolData = {
  protocol: string
  registry: string
  registryPlusCount: number
  status: string
  nature: string
  stage: string
  analyst?: string | null
  date: Date | string
  hour: string
}

export type ProductionData = Omit<Analyst, 'username'> & { protocols: ProtocolData[] }

export type Production = {
  [key: string]: ProductionData
}

export type StageData = {
  protocol: number
  registry: string
  registryPlusCount: number
  nature: string
  stage?: string
  stageOrder?: number
  date: Date | string
  hour: string
}

export type Stage = {
  [key: string]: StageData[]
}

export type AnalystProductionSorting = AnalystProductionSortingEnum

export type AnalystProductionSortingFunction = (
  [aKey, aValue]: [string, ProductionData],
  [bKey, bValue]: [string, ProductionData]
) => 0 | 1 | -1

export type AnalystProductionFiltering = AnalystProductionFilteringEnum
