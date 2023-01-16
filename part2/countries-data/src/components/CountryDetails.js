const CountryInfo = ({ countryData }) => 
  <div>
    <h2>{countryData.name.common}</h2>
    <div>capital {countryData.capital[0]}</div>
    <div>capital {countryData.area}</div>
    <h4>languages:</h4>
    <ul>
      {Object.values(countryData.languages).map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <img src={countryData.flags.png} alt="country flag" />
  </div>

const WeatherInfo = ({ weatherData }) => {
  console.log(weatherData)
  return <div>
    <h2>Weather in {weatherData.name}</h2>
    <div>temperature {Math.round(weatherData.main.temp - 273.15)} Celsius</div>
    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
    <div>wind {weatherData.wind.speed} m/s</div>
  </div>
}

export { CountryInfo, WeatherInfo }