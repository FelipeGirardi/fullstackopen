import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests.js'
import { useNotifDispatch } from '../NotifContext.js'

const AnecdoteList = ({anecdotes}) => {
  const notifDispatch = useNotifDispatch()
  const notifTime = 3000
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anec => anec.id === updatedAnecdote.id ? updatedAnecdote : anec))

      notifDispatch({ payload: `Voted on anecdote ${updatedAnecdote.content}` })
      setTimeout(() => {
        notifDispatch({ payload: '' })
      }, notifTime)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList