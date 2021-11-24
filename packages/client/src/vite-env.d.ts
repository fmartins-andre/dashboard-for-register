/// <reference types="vite/client" />

export type Data = {
  protocolo: string
  situacao: string
  natureza: string
  etapa: string
  data: Date | string
  hora: string
}

export type Production = {
  [key: string]: Data[]
}
