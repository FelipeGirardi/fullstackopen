import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from 'react'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')

  const [ changeAuthor ] = useMutation(EDIT_AUTHOR)

  // useEffect(() => {
  //   if (editResult.data && !editResult.data.name) {
  //     console.log('name not found')
  //   }
  // }, [editResult.data]) // eslint-disable-line 

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const updateAuthor = async (event) => {
    event.preventDefault()

    changeAuthor({variables: { name: authorName, setBornTo: authorBorn }})

    setAuthorName('')
    setAuthorBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      &nbsp;
      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <select
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          >
            {authors.map((a) => 
              <option value={a.name} key={a.id}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(parseInt(target.value))}
          />
        </div>
      <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
