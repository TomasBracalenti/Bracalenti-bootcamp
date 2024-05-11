import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import FormPerson from './components/FormPerson'
import PersonsToShow from './components/PersonsToShow' // Add this line
import personService from './services/personService'
import Message from './components/Message'



const App = () => {

  //variables de estado
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    personService.getAll()
    .then(response => { setPersons(response.data) })
  },[])

  //manejadores de eventos: addPerson
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personFind = persons.find(person => person.name === newName)
    if(newName!=='' &&  !personFind && newNumber!==''){
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))   
      },
      setMessage({ type:'success', text: `Added ${newName}`}),
      setTimeout(() => {setMessage(null)}, 5000)
    )
      setNewName('');
      setNewNumber('');
    }
    else {
      if(newNumber!=='' && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson = {...personFind, number: newNumber}
        personService.update(changedPerson.id, changedPerson)
        .then(response => { //agregar mensaje de exito
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : response.data))
        },
        console.log('changedPerson', changedPerson),
        setMessage({ type:'success', text: `${newName} change his number to : ${newNumber}`}),
        setTimeout(() => {setMessage(null)}, 5000)
      )
      .catch(error => {
        setMessage({ type:'error', text: `Information of ${newName} has already been removed from server` })
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.filter(person => person.id !== changedPerson.id))
      })
      
      }
    }
  }

  //manejadores de eventos: deletePerson
  const handleDeletePerson = (event) => {
    const id = event.target.id
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name} ?`)){
      personService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setMessage({ type:'error', text: `Information of ${person.name} has already been removed from server` })
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  //manejadores de eventos: handleFilterChange
const handleFilterChange = (event) => {
  setSearch(event.target.value)
  //console.log(search)
}

//manejadores de eventos: handleName
const handleNumber = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  

  //render
  return (
    <div>
      <Message message={message}/>
      <h2>Phonebook</h2>
      <Filter input search={search} handleFilterChange={handleFilterChange}/> 
      <h3>add a new</h3>
      <FormPerson addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
      <h3>Numbers</h3>
      <PersonsToShow persons={persons} search={search} handleDeletePerson={handleDeletePerson}/>

    </div>
  )
}

export default App;