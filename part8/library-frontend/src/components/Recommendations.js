import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE, ME } from "../queries"

const Recommendations = () => {
  const currentUser = useQuery(ME)
	const favoriteGenre = currentUser?.data?.me?.favoriteGenre
  const getBooksByGenre = useQuery(BOOKS_BY_GENRE, { skip: !favoriteGenre, variables: { genre: favoriteGenre } })

  if (currentUser.loading || getBooksByGenre.loading) {
		return <div>...loading</div>;
	}

  const books = getBooksByGenre.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      Books in your favorite genre: <strong>{favoriteGenre}</strong>
      <table style={{ marginTop: '.5rem' }} >
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
