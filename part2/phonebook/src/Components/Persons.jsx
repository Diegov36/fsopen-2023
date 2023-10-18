const Persons = ({persons, filterName, deletePerson}) =>{
    return(
      <div>
        <h2>Numbers</h2>
        {persons.filter((person) => person.name.includes(filterName)).map((person) => (
          <div key={person.name}>
            <p>{person.name} {person.number}</p> 
            <button onClick={() => deletePerson(person.name, person.id)}>Delete</button>
          </div>
        ))}
      </div>    
    )  
}

export default Persons