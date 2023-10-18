const PersonForm = ({addPerson, handleChange, handleChangeNumber}) =>{
    return(
      <div>
        <h2>Add a new person</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input  onChange={handleChange}/>          
          </div>
          <div>number: <input onChange={handleChangeNumber}/></div>  
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm