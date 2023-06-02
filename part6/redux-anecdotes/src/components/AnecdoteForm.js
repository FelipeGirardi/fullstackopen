import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notifTime = 3000

  const addAnec = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))

    dispatch(setNotification(`Added anecdote: ${content}`, notifTime))
  }

  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnec}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

export default AnecdoteForm