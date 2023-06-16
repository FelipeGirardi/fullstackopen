import {
  Routes, Route, useMatch
} from 'react-router-dom'
import AnecdoteList from './components/AnecdotesList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import CreateNew from './components/CreateNew'

const AppRoutes = ({anecdotes, addNew}) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anec => anec.id === Number(match.params.id))
    : null

return <Routes>
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path="/" element={<div></div>} />
      </Routes>
}

export default AppRoutes