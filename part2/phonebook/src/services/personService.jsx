import axios from "axios";

const baseUrl = "http://localhost:3001/persons";


const getAll = () =>{
    return axios.get(baseUrl)
}

const create = NewPerson =>{
    return axios.post(baseUrl, NewPerson)
}

const update = (id, NewPerson) =>{
    return axios.put(`${baseUrl}/${id}`, NewPerson)
}

const deletePerson = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}


const personService = {
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}

export default personService;
