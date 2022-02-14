import {
  useState,
  useEffect,
  ChangeEventHandler,
  useCallback
} from 'react'
import {
  AnalystProductionSorting as Sorting,
  Production
} from '../types/types'
import {
  AnalystProductionSortingEnum as SortingTypes,
  AnalystProductionFilteringEnum as FilteringTypes
} from '../types/enums'
import { usePageVisibility } from 'react-page-visibility'
import getData from '../services/getData'
import dateFormat from '../services/dateFormat'
import sortData from '../data/AnalystProductionSorting'
import FilterButton from '../components/FilterButton'
import filterData from '../data/AnalystProductionFiltering'

const defaultSorting =
  (import.meta.env?.VITE_ANALYST_PROD_SORTING as SortingTypes) ?? SortingTypes.ALPHA_ASC

const envFilter = (import.meta.env?.VITE_ANALYST_PROD_FILTER as string)
const defaultFilter = envFilter
  ? (envFilter.split(' ') as FilteringTypes[])
  : []

function AnalystsProduction () {
  const isPageVisible = usePageVisibility()

  const [allOpen, setAllOpen] = useState<true|undefined>(undefined)
  const [data, setData] = useState<Production|null>(null)
  const [filteredData, setFilteredData] = useState<Production|null>(null)
  const [error, setError] = useState<string|null>(null)
  const [sorting, setSorting] = useState<Sorting>(defaultSorting)
  const [filters, setFilters] = useState<FilteringTypes[]>(defaultFilter)

  const updateData = async () => {
    try {
      const result = await getData('analysts/production')
      console.info('::: API data received: ', result)
      setData(result)
      if (error) setError(null)
    } catch (error:any) {
      console.error('::: Network error: ', error)
      setError(error.message)
    }
  }

  const toggleAllDetails = useCallback(() => {
    setAllOpen(allOpen ? undefined : true)
  }, [allOpen])

  const handleSorting: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSorting((e.currentTarget.value) as Sorting)
  }

  const handleDataOnSorting = useCallback(() => {
    if (filteredData || data) setFilteredData(sortData((filteredData ?? data)!, sorting))
  }, [data, filteredData, sorting])

  const handleDataOnFiltering = useCallback(() => {
    if (data) {
      if (!filters.length) {
        setFilteredData(sortData(data, sorting))
      } else {
        setFilteredData(sortData(filterData(data, filters), sorting))
      }
    }
  }, [data, filters, sorting])

  useEffect(() => {
    handleDataOnSorting()
  }, [sorting, data])

  useEffect(() => {
    handleDataOnFiltering()
    console.log('filters: ', filters)
  }, [filters, data])

  useEffect(() => {
    if (isPageVisible) updateData()
  }, [isPageVisible])

  return (
    <div>
      <main>
        <header>
          <h2>Produção por Analista</h2>
          <nav className="button-group">
            <FilterButton
              options={[
                {
                  name: 'escrevente',
                  value: FilteringTypes.CLERK,
                  checked: filters.some(i => i === FilteringTypes.CLERK)
                },
                {
                  name: 'supervisor',
                  value: FilteringTypes.SUPERVISOR,
                  checked: filters.some(i => i === FilteringTypes.SUPERVISOR)
                },
                {
                  name: 'tag',
                  value: FilteringTypes.TAG,
                  checked: filters.some(i => i === FilteringTypes.TAG)
                }
              ]}
              onApply={(select) => {
                // @ts-ignore
                setFilters(select)
              } }
            >
              #
            </FilterButton>
            <select onChange={handleSorting} value={sorting}>
              <option value={SortingTypes.ALPHA_ASC}>A&#8673;</option>
              <option value={SortingTypes.ALPHA_DES}>Z&#8675;</option>
              <option value={SortingTypes.TOTAL_ASC}>1&#8673;</option>
              <option value={SortingTypes.TOTAL_DES}>9&#8675;</option>
            </select>
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

        { (filteredData || data) &&
          !error &&
          Object.keys((filteredData ?? data)!).map((analyst) => {
            return (
            <details key={analyst} open={allOpen}>
              <summary>
                <span>{analyst}</span>
                <span>{(filteredData ?? data)![analyst].protocols.length}</span>
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
                {(filteredData ?? data)![analyst].protocols.map((key, index) => {
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
