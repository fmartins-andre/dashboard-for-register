import mysql2 from 'mysql2/promise'

const getDatabaseConnection = async (): Promise<mysql2.Connection | undefined> => {
  const config = {
    host: process.env.MYSQL_HOST!,
    port: +process.env.MYSQL_PORT!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DB!
  }
  try {
    const connection = await mysql2.createConnection(config)
    return connection
  } catch (error) {
    console.error('[ ERROR ] MYSQL: ', error)
    return undefined
  }
}

export default getDatabaseConnection
