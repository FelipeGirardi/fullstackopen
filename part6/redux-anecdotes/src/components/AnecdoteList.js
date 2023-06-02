import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.includes(filter))
  })
  const dispatch = useDispatch()
  const notifTime = 3000

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const votedAnecdote = anecdotes.find(a => a.id === id).content
    dispatch(setNotification(`Voted anecdote: ${votedAnecdote}`, notifTime))
  }

  return (
    <div>
    <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList