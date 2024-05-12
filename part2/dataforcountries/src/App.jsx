import { useState, useEffect } from 'react'
import CountriesToShow from './components/CountriesToShow'
import countriesServices from './services/countriesServices'
function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showCountry, setShowCountry] = useState('')

  useEffect(() => {
    countriesServices.getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log('countries:', countries)
  return (
    <div>
      <div>
        find countries <input value={search} onChange={(e) => {setSearch(e.target.value), setShowCountry('')}} />
      </div>
      <div>
        <CountriesToShow countries={countries} search={search} showCountry={showCountry} setShowCountry={setShowCountry} />
      </div>
    </div>
  )
}

export default App
