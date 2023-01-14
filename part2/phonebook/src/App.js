import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) =>
  <div>
    filter shown with
    <input
      value={value}
      onChange={onChange}
    />
  </div>

const PersonForm = (props) =>
  <form onSubmit={props.addName}>
    <div>name:
      <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Person = ({person}) =>
  <li>{person.name} {person.number}</li>

const Persons = ({personsToShow}) =>
  <ul>
    {personsToShow.map(person => <Person key={person.id} person={person} />)}
  </ul>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    for (const p of persons) {
      if (p.name === newName) {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.at(-1).id + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App