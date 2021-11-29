import getDatabaseConnection from '../infra/getDatabaseConnection'

const getStageData = async () => {
  const connection = await getDatabaseConnection()

  if (!connection) throw Error('[ ERROR ] MYSQL: Could not make connection with database.')

  const [stagesRows] = await connection.execute(`
    SELECT
      DISTINCT (l1.L1_Protocolo) AS 'protocol',
      l1.L1_Natureza AS 'nature',
      et.Et_Descricao AS 'stage',
      et.et_ordem AS 'stageOrder',
      l1et.ie1_dataentrada AS 'date',
      l1et.ie1_horaentrada AS 'hour'
    FROM sqlreg3.l1
    INNER JOIN sqlreg3.etapa AS et ON(l1.l1_etapa = et.Et_id)
    LEFT JOIN sqlreg3.l1_indicadoretapas AS l1et ON(l1.L1_Protocolo = l1et.ie1_protocolo AND et.Et_id = l1et.ie1_etapa AND l1et.ie1_dataentrada >= l1.L1_DataEtapa)
    WHERE l1.L1_Ativo = 1 AND l1.l1_outro = 0 AND l1.l1_duvida = 0
    ORDER BY et.et_ordem, l1.L1_Protocolo, l1.L1_Natureza
  `)

  await connection.end()

  return stagesRows
}

export type StageData = {
  protocol: number
  nature: string
  stage?: string
  stageOrder?: number
  date: Date | string
  hour: string
}

export type Stage = {
  [key: string]: StageData[]
}

export default getStageData
