const getData = async (resource: string) => {
  const apiAddress = import.meta.env?.VITE_API_ADDRESS ?? 'http://localhost:5000'

  const endpoint = `${apiAddress}/api/v1/${resource}`
  console.info(`::: Called API endpoint: ${endpoint}`)

  const response = await fetch(endpoint)
  return await response.json()
}

export default getData
