import { useQuery } from 'react-query'
import { getAnecdotes } from './requests.js'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }
  if ( result.error ) {
    return <div>Anecdote service not available due to problems in the server.</div>
  }

  const anecdotes = result.data !== undefined ? result.data : 
  {
    content: "If it hurts, do it more often",
    id: 47145,
    votes: 0
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
