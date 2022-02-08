/// <reference types="vite/client" />

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

export type Production = {
  [key: string]: ProtocolData[]
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
