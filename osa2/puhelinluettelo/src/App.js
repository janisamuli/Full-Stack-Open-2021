import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Filter from './Components/Filter.js'
import PersonForm from './Components/PersonForm.js'
import Persons from './Components/Persons.js'
import personsService from './Services/personsService.js'
import Notification from './Components/Notification.js'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFiltered, setNewFiltered] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

 


  const addPerson = (event) => {
    event.preventDefault()



    const personObject = {
      name: newName,
      number: newNumber,
      id: nanoid()
    }

    const personAlreadyAdded  = persons.filter(
  person => person.name === newName  );

  const personUpdate = personAlreadyAdded[0]

    if(personAlreadyAdded.length > 0) 
    {
      if(window.confirm(`${newName} has been already added to the phonebook. Replace the old number with a new one? `))
     {
      personsService.update(personUpdate.id, personObject )
      .then(response => {
        setPersons(persons.map(person => person.id !== personUpdate.id ? person : response.data))
        setNotification(`Changed the phone number of ${newName}.`)
    setTimeout(() => {
      setNotification(null) 
    }, 5000)
      })
      .catch( error => {
        setNotification(`${newName} has been already deleted from the server.`)
        setTimeout(() => {
          setNotification(null) 
        }, 5000)

        setPersons(persons.filter(person => person.name !== newName))
      })

    }

      setNewName('')
      setNewNumber('')
      return 
      }


    personsService
    .create(personObject)
  .then(response => {
    setPersons(persons.concat(response.data))

    setNotification(`Added ${newName}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  })
    
  }


  const handlePersonChange = (event)  =>{
setNewName(event.target.value)
  } 

  const handleNumberChange = (event)  =>{
    setNewNumber(event.target.value)
      } 

      const handleFilteredChange = (event)  =>{
        setNewFiltered(event.target.value)
          }   
          
      const deletePerson = (name,id) => {
            if(window.confirm(`Delete ${name} ?`)){
              personsService.wipeout(id)
                setPersons(persons.filter((person) => person.id !== id))
              }

              setNotification(`Deleted ${name} from phonebook`)
              setTimeout(() => {
                setNotification(null) 
              }, 5000)
            }
           



  

  return (
    
    <div>
    <h2> Phonebook</h2>

    <Notification message={notification} />

<Filter value={newFiltered} onChange={handleFilteredChange} />

      <h2>Add a new</h2>

    <PersonForm 

    addPerson = {addPerson} newName={newName} handlePersonChange = {handlePersonChange}
    newNumber = {newNumber} handleNumberChange = {handleNumberChange} 
    />

      
      <h2>Numbers</h2>
     <Persons persons = {persons} newFiltered= {newFiltered} deletePerson = {deletePerson}/>
    </div>
  )

}

export default App