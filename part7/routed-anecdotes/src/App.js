import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { Page } from './styles'
import Menu from './components/Menu'
import Footer from './components/Footer'
import AppRoutes from './AppRoutes'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`new anecdote created: ${anecdote.content}`)
    setTimeout(
      function () {
        setNotification('')
      }, 5000)
    navigate('/anecdotes')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <Page>
        <h1>Software anecdotes</h1>
        <Menu />
        {(notification &&
          <Alert variant="success">
            {notification}
          </Alert>
        )}
        <AppRoutes anecdotes={anecdotes} addNew={addNew} />
        &nbsp;
        <Footer />
      </Page>
    </div>
  )
}

export default App
