import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)
  const [ message , setMessage ] = useState(null) 
  const [ messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  },[])

  const handleChange = (event) =>{    
    setNewName(event.target.value)
  }

  const changePerson = (newPerson) =>{
    const person = persons.find(p => p.name === newPerson.name)
    const changedPerson = {...person, number: newPerson.number}
    personService.changeNumber(person.id, changedPerson).then(response =>
      setPersons(persons.map(p => p.id !== person.id ? p : response.data))
    )

  }

  const changeMessage = (message, type) =>{
      setMessage(message)
      setMessageType(type)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}    
    if(persons.filter((person) => person.name === newPerson.name).length > 0){
      if(window.confirm(`${newPerson.name} is already added to phonebook, do you want to replace the number with a new one?`)){
        changePerson(newPerson)
        changeMessage(`${newPerson.name} has changed his number to ${newPerson.number}`, "success")
      }
    }else{
      personService.addPerson(newPerson).then(setPersons(persons.concat(newPerson)))
      changeMessage(`${newPerson.name} succesfully added to the phonebook`, "success")
    }            
  }

  const handleChangeNumber = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) =>{
    const name = event.target.value    
    setFilter(name)
  }

  const deletePerson = (name, id) =>{
    if(window.confirm(`Delete ${name} ?`)){
      personService.deletePerson(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .catch(error => changeMessage(`${name} has already been removed`, "error"))      
    }    
  }

  const Notification = ({message}) =>{
    if(message === null){
      return null
    }
    return(
      <div className={messageType}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message}/>
      <Filter handleFilter={handleFilter}/>
      <PersonForm handleChange={handleChange} handleChangeNumber={handleChangeNumber} addPerson={addPerson}/>
      <Persons persons={persons} filterName={filter} deletePerson={deletePerson}/>     
      
    </div>
  )
}

export default App