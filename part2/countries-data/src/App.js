import { useState, useEffect } from 'react'
import axios from 'axios'
import { CountryInfo, WeatherInfo } from './components/CountryDetails'

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
    return <CountryInfo countryData={countriesToShow[0]} />
  } else if (nCountries === 0) {
    return <div></div>
  }
}

const CountryItem = ({ country }) => {
  const [showCountryInfo, setShowCountryInfo] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherInfo(response.data)
      })
  }, [country.capital, country.cca2])

  return (
    <li key={country.name.common}>
      {country.name.common} <button onClick={() => setShowCountryInfo(!showCountryInfo)}>{showCountryInfo ? "hide" : "show"}</button>
      {showCountryInfo ? <CountryInfo countryData={country} /> : <div></div>}
      {showCountryInfo ? <WeatherInfo weatherData={weatherInfo} /> : <div></div>}
      <span>&nbsp;&nbsp;</span>
    </li>)
}

const CountryList = ({ countriesToShow }) => {
  return <div>{countriesToShow.map(c =>
    <CountryItem key={c.name.common} country={c} />
  )}</div>
}

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
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
      <span>&nbsp;&nbsp;</span>
      <Description countriesToShow={countriesToShow} />
    </div>
  )
}

export default App;