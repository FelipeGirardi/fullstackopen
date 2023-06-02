import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnec(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anec => 
        anec.id !== id ? anec : newAnecdote
      ).sort((a, b) => {
        return b.votes - a.votes
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnec, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a, b) => {
      return b.votes - a.votes
    })
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.update(id)
    dispatch(voteAnec(id))
  }
}

export default anecdoteSlice.reducer