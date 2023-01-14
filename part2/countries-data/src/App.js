import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryForm = (props) =>
  <form>
    <div>find countries
      <input value={props.country} onChange={props.handleCountryChange} />
    </div>
  </form>

const Description = ({ countriesToShow }) => {
  console.log(countriesToShow)
  const nCountries = countriesToShow.length
  if (nCountries > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (nCountries > 1) {
    return <CountryList countriesToShow={countriesToShow} />
  } else if (nCountries === 1) {
    console.log("found 1 country")
    return <CountryInfo countryData={countriesToShow[0]} />
  } else if (nCountries === 0) {
    return <div></div>
  }
}

const CountryItem = ({ country }) => {
  const [showCountryInfo, setShowCountryInfo] = useState(false)
  return (
    <li key={country.name.common}>
      {country.name.common} <button onClick={() => setShowCountryInfo(!showCountryInfo)}>{showCountryInfo ? "hide" : "show"}</button>
      {showCountryInfo ? <CountryInfo countryData={country} /> : <div></div>}
    </li>)
}

const CountryList = ({ countriesToShow }) => {
  return <div>{countriesToShow.map(c =>
    <CountryItem country={c} />
  )}</div>
}

const CountryInfo = ({ countryData }) => 
  <div>
    <h2>{countryData.name.common}</h2>
    <div>capital {countryData.capital}</div>
    <div>capital {countryData.area}</div>
    <h4>languages:</h4>
    <ul>
      {Object.values(countryData.languages).map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <img src={countryData.flags.png} alt="country flag" />
  </div>

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState({})

  useEffect(() => {
    console.log('Effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    const currentCountryValue = event.target.value
    setCountry(currentCountryValue)
  }

  const countriesToShow = country
    ? countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))
    : []

  return (
    <div>
      <CountryForm country={country} handleCountryChange={handleCountryChange} />
      <Description countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;