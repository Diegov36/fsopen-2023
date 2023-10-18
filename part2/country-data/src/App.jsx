import {React, useEffect,  useState } from 'react'
import axios from 'axios'
import FilteredData from './Components/FilteredData'

export const API_KEY = "apikey...."

function App() {
  const [countryData, setCountryData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setCountryData(response.data))    
  },[])

  const handleChange = (event) =>{    
    setFilteredData(countryData.filter(
      country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      ))    
  }  
  
  return (
    <div>
      <form>
        Find countries<input onChange={handleChange}/>        
      </form>
      <FilteredData filteredData={filteredData}/> 
    </div>
  )
}

export default App
