import { useState, useEffect } from "react"
import axios from 'axios'
import { API_KEY } from "../App"

const WeatherInfo = ({capital}) => {
  const [weather, setWeather] = useState("")  
  useEffect(() => {
    const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`    
    axios.get(URL).then(data => setWeather(data))
  },[])

  return(
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {}</p>
      <p>Wind: {}</p>
    </div>
  )
}

const CountryListElement = ({country}) =>{
  const [showData, setShowData] = useState(false)
  const handleClick = () =>{
    setShowData(!showData)
  }

  return(
    <div>      
      {country.name.common}<button onClick={handleClick}>Show</button>        
      {showData && <CountryData data={country}/>}
    </div>
  )
}

const CountryList = ({data}) =>{  
  return(
    <div>
      {data.map((country) => (        
        <CountryListElement key={country.name.official} country={country}/>
      ))}
    </div>
  )
}

const CountryData = ({data}) =>{
  const languages = Object.values(data.languages) 
  return(
    <div>
      <h3>{data.name.common}</h3>
      <p>Capital: {data.capital[0]}</p>
      <p>Population: {data.population}</p>
      <h3>Languages:</h3>
      {languages.map((lang, index) => (        
        <p key ={index}> {lang}</p>        
      ))}
      <img src={data.flags.png}/>
      <WeatherInfo capital={data.capital[0]}/>
    </div>
  )
}

const FilteredData = ({filteredData}) =>{
    if(filteredData.length === 1){
      return(
        <CountryData data = {filteredData[0]}/>           
      )            
    }else if(filteredData.length < 10){
      return(
        <CountryList data = {filteredData}/>   
      )
    }else{
      return(
        <p>Too many matches, specify another filter</p>
      )
    }
}

export default FilteredData