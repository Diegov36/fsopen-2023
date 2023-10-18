const Filter = ({handleFilter}) =>{
    return(
      <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with <input onChange={handleFilter}/>
        </div>
      </div>
      
    )
  }

export default Filter;