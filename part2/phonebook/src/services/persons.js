import axios from 'axios'
const URL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const addPerson = (person) =>{
    const request = axios.post(URL, person)
    return request.then(response => response.data)
}

const deletePerson = (id) =>{
    const request = axios.delete(`${URL}/${id}`)
    return request.then(response => response.data)
}

const changeNumber = (id, newPerson) =>{
    return axios.put(`${URL}/${id}`, newPerson)
}

export default {getAll, addPerson, deletePerson, changeNumber}