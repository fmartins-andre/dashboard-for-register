import { Production } from '../vite-env'
import { useState, useEffect } from 'react'
import { usePageVisibility } from 'react-page-visibility'
import getData from '../services/getData'
import dateFormat from '../services/dateFormat'

function AnalystsProduction () {
  const isVisible = usePageVisibility()
  const [allOpen, setAllOpen] = useState<true|undefined>(undefined)
  const [data, setData] = useState<Production|null>(null)
  const [error, setError] = useState<string|null>(null)

  const updateData = () => {
    getData('analysts/production').then(result => {
      console.info('::: API data received: ', result)
      setData(result)
      if (error) setError(null)
    }).catch(error => {
      console.log('::: Network error: ', error)
      setError(error.message)
    })
  }

  const toggleAllDetails = () => {
    setAllOpen(allOpen ? undefined : true)
  }

  useEffect(() => {
    if (isVisible) updateData()
  }, [isVisible])

  return (
    <div>
      <main>
        <header>
          <h2>Produção por Analista</h2>
          <nav className="button-group">
            <button onClick={toggleAllDetails}>&#8645;</button>
            <button onClick={updateData}>&#8634;</button>
          </nav>
        </header>

        {!error && !data &&
          <div className="loading">
            <h3>Carregando...</h3>
          </div>
        }

        {error &&
          <div className="error">
            <h3>Erro</h3>
            <p>Ocorreu um erro ao tentar recuperar os dados do servidor</p>
            <code>{error}</code>
          </div>
        }

        {data && !error && Object.keys(data).map((analyst) => {
          return (
            <details key={analyst} open={allOpen}>
              <summary>
                <span>{analyst}</span>
                <span>{data[analyst].length}</span>
              </summary>
              <table>
                <thead>
                  <tr>
                    <th>Protocolo</th>
                    <th>Matrículas</th>
                    <th>Etapa</th>
                    <th>Data / Hora</th>
                    <th>Natureza</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                {data[analyst].map((key, index) => {
                  return (
                    <tr key={index} className={(index + 1) % 2 !== 0 ? 'odd' : ''}>
                      <td>{key.protocol}</td>
                      <td>
                        {key.registry}
                        {key.registryPlusCount > 1 &&
                          <span style={{ filter: 'brightness(0.5)', fontSize: '0.85em' }}>
                            {` (+${key.registryPlusCount - 1})`}
                          </span>
                        }
                      </td>
                      <td>{key.stage}</td>
                      <td>{dateFormat(key.date as string)} {key.hour.substr(0, 5)}</td>
                      <td>{key.nature}</td>
                      <td>{key.status}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </details>
          )
        })}

      </main>
    </div>
  )
}

export default AnalystsProduction
