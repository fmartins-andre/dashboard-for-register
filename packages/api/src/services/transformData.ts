
export interface Data {
  protocolo: string
  situacao: string
  natureza: string
  etapa: string
  escrevente?: string | null
  data: Date | string
  hora: string
}

export interface Production {
  [key: string]: Data[]
}

const transformData = (data: Data[]) => {
  const production: Production = {}

  data.forEach(row => {
    if (row.escrevente == null) return null

    if (!(row.escrevente in production)) {
      production[row.escrevente] = []
    }

    const data = { ...row }
    delete data.escrevente
    production[row.escrevente].push(data)
  })

  return production
}

export default transformData
