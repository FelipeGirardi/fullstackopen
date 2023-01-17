import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter.js'
import PersonForm from './components/person_form.js'
import Persons from './components/person_list.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    for (const p of persons) {
      if (p.name === newName) {
        if (window.confirm(`${p.name} is already added to the phonebook, replace the old number with a new one?`)) {
          const personObject = {
            name: newName,
            number: newNumber,
            id: p.id
          }

          personService.update(p.id, personObject)
            .then((returnedPerson) => {
              console.log('updated number')
              setPersons(persons.map(prsn => prsn.id !== p.id ? prsn : returnedPerson))
            })
          return
        }
      }
    }

    console.log(persons)
    const personObject = {
      name: newName,
      number: newNumber,
      id: (typeof persons !== 'undefined' && persons.length > 0) ? persons.at(-1).id + 1 : 0
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log('created person')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const currentFilterValue = event.target.value
    setFilteredName(currentFilterValue)
    setIsFiltering(currentFilterValue.length > 0 ? true : false)
  }

  const personsToShow = isFiltering
    ? persons.filter(person => person.name.toLowerCase().includes(filteredName))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} onChange={handleFilterChange} />
      <h3>Add new item</h3>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} allPersons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App