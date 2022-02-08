import getDatabaseConnection from '../infra/getDatabaseConnection'

const getProductionData = async () => {
  const connection = await getDatabaseConnection()

  if (!connection) throw Error('[ ERROR ] MYSQL: Could not make connection with database.')

  const [productionRows] = await connection.execute(`
    SELECT
      l1.L1_Protocolo AS "protocol",
      l2.l2_matricula AS "registry",
      COUNT(l2.l2_matricula) - 1  AS "registryPlusCount",
      IF(l1.L1_Ativo = 1, 'Ativo',
        IF(l1.l1_duvida = 1, 'Dúvida', 'Encerrado')
      ) AS "status",
      l1.L1_Natureza AS "nature",
      et.Et_Descricao AS "stage",
      us.Us_Login AS "analyst",
      l1et.ie1_dataentrada AS "date",
      l1et.ie1_horaentrada AS "hour"
    FROM sqlreg3.l1
    INNER JOIN sqlreg3.etapa AS et ON(l1.l1_etapa = et.Et_id)
    LEFT JOIN sqlreg3.usuario AS us ON(l1.L1_Dist = us.Us_Id)
    LEFT JOIN sqlreg3.l1_indicadoretapas AS l1et ON(l1.L1_Protocolo = l1et.ie1_protocolo AND et.Et_id = l1et.ie1_etapa AND l1et.ie1_dataentrada >= l1.L1_DataEtapa)
    LEFT JOIN sqlreg3.l1_l2 ON(l1.L1_Protocolo = l1_l2.protL1)
    LEFT JOIN sqlreg3.l2 ON(l1_l2.idL2 = l2.L2_Id)
    WHERE l1.l1_etapa IN (2, 11)
    GROUP BY l1.L1_Protocolo
    ORDER BY us.Us_Login, l1.L1_Natureza, l1.L1_Protocolo
  `)

  await connection.end()

  return productionRows
}

export type ProtocolData = {
  protocol: string
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
export default getProductionData
