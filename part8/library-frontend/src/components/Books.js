import { useQuery, useLazyQuery } from "@apollo/client"
import { useState } from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"

const Books = () => {
  const allBooks = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null);
	const [getBooksByGenre, booksByGenre] = useLazyQuery(BOOKS_BY_GENRE, { variables: { genre } });

  if (allBooks.loading || booksByGenre.loading)  {
    return <div>loading...</div>
  }

  const books = !genre ? allBooks.data.allBooks : booksByGenre.data.allBooks
  let genreArray = []
  allBooks.data.allBooks.map((a) => (genreArray = genreArray.concat(a.genres)));
	const genres = [...new Set(genreArray)];

  const selectGenre = (g) => {
    getBooksByGenre({variables: {genre: g}})
    setGenre(g)
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? <h4>Books in genre {genre}</h4> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)
)}
        </tbody>
      </table>

      {genres.map((g) => (
        <button key={g} onClick={() => selectGenre(g)}>{g}</button>
      ) )}
    </div>
  )
}

export default Books
