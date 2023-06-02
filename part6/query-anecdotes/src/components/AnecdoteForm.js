import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests.js'
import { useNotifDispatch } from '../NotifContext.js'

const AnecdoteForm = () => {
  const notifDispatch = useNotifDispatch()
  const notifTime = 3000
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

      notifDispatch({ payload: `Added anecdote ${newAnecdote.content}` })
      setTimeout(() => {
        notifDispatch({ payload: '' })
      }, notifTime)
    },
    onError: () => {
      notifDispatch({ payload: `Error: anecdote is too short, must have length of 5 or more` })
      setTimeout(() => {
        notifDispatch({ payload: '' })
      }, notifTime)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      id: getId(),
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
      &nbsp;
    </div>
  )
}

export default AnecdoteForm
