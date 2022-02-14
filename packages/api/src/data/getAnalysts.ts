import getDatabaseConnection from '../infra/getDatabaseConnection'

const getAnalysts = async () => {
  const connection = await getDatabaseConnection()

  if (!connection) {
    throw Error('[ ERROR ] MYSQL: Could not make connection with database.')
  }

  const [usersRows] = await connection.execute(`
    SELECT
      u.Us_Login AS 'username',
      CAST(IF(u.us_supervisor, 'true', 'false') AS JSON) AS 'isSupervisor',
      CAST(IF(u.us_Escrevente, 'true', 'false') AS JSON) AS 'isClerk',
      CAST(IF(INSTR(u.Us_Obs, "#dashboard"), 'true', 'false') AS JSON) AS 'hasTag'
    FROM sqlreg3.usuario u
    WHERE u.us_ativo = 1
    ORDER BY u.Us_Login
  `)

  await connection.end()

  return usersRows
}

export default getAnalysts
