import personService from '../services/persons'

const Persons = ({personsToShow, allPersons, setPersons}) =>
  <ul>
    {personsToShow.map(person => <Person key={person.id} person={person} allPersons={allPersons} setPersons={setPersons} />)}
  </ul>

const Person = ({person, allPersons, setPersons}) => {
  const confirmDelete = (person) => {
    console.log(person)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
        .then(() => {
          console.log('deleted person')
          setPersons(allPersons.filter(p => p.id !== person.id))
        })
    }
  }

  return <div>
    <li>{person.name} {person.number} <button onClick={() => confirmDelete(person)}>delete</button></li>
  </div>
}

export default Persons