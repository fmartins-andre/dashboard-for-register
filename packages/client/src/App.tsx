import { Production } from './vite-env'
import { useState, useEffect } from 'react'
import './App.css'
import getData from './services/getData'
import dateFormat from './services/dateFormat'

function App () {
  const [data, setData] = useState<Production|null>(null)
  const [error, setError] = useState<string|null>(null)

  const updateData = () => {
    getData().then(result => {
      console.info('::: API data received: ', result)
      setData(result)
      if (error) setError(null)
    }).catch(error => {
      console.log('::: Network error: ', error)
      setError(error.message)
    })
  }

  useEffect(() => {
    updateData()
  }, [])

  return (
    <div className="App">
      <main className="App-main">
        <header>
          <h2>Produção por Analista</h2>
          <span><button className="reload" onClick={updateData}>&#8634;</button></span>
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

        {data && Object.keys(data).map((analyst) => {
          return (
            <details key={analyst}>
              <summary>
                <span>{analyst}</span>
                <span>{data[analyst].length}</span>
              </summary>
              <table>
                <thead>
                  <tr>
                    <th>Protocolo</th>
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
                      <td>{key.protocolo}</td>
                      <td>{key.etapa}</td>
                      <td>{dateFormat(key.data as string)} {key.hora.substr(0, 5)}</td>
                      <td>{key.natureza}</td>
                      <td>{key.situacao}</td>
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

export default App
