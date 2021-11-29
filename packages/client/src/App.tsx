import { Routes, Route, Link } from 'react-router-dom'
import AnalystsProduction from './pages/AnalystsProduction'
import Stages from './pages/Stages'

function App () {
  return (
    <div>
      <main>
        <header>
          <nav className="menu">
            <Link to='/'>Produção</Link>
            <Link to='/etapas'>Etapas</Link>
          </nav>
        </header>

        <Routes>

          <Route path="/" element={<AnalystsProduction />}/>
          <Route path="/etapas" element={<Stages />}/>

        </Routes>

      </main>
    </div>
  )
}

export default App
