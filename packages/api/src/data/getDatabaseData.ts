import getDatabaseConnection from '../infra/getDatabaseConnection'

const getDatabaseData = async () => {
  const connection = await getDatabaseConnection()

  if (!connection) throw Error('[ ERROR ] MYSQL: Could not make connection with database.')

  const [productionRows] = await connection.execute(`
    SELECT
    l1.L1_Protocolo AS "protocolo", 
    IF(l1.L1_Ativo = 1, 'ativo',
      IF(l1.l1_duvida =1, 'Dúvida', 'Encerrado')
    ) AS "situacao",
    l1.L1_Natureza AS "natureza",
    et.Et_Descricao AS "etapa",
    us.Us_Login AS "escrevente",
    l1et.ie1_dataentrada AS "data",
    l1et.ie1_horaentrada AS "hora"
  FROM sqlreg3.l1
  INNER JOIN sqlreg3.etapa AS et ON(l1.l1_etapa = et.Et_id)
  LEFT JOIN sqlreg3.usuario AS us ON(l1.L1_Dist = us.Us_Id)
  LEFT JOIN sqlreg3.l1_indicadoretapas AS l1et ON(l1.L1_Protocolo = l1et.ie1_protocolo AND et.Et_id = l1et.ie1_etapa AND l1et.ie1_dataentrada >= l1.L1_DataEtapa)
  WHERE l1.l1_etapa IN (2, 11)
  ORDER BY us.Us_Login, l1.L1_Natureza, l1.L1_Protocolo
  `)

  await connection.end()

  return productionRows
}

export default getDatabaseData
