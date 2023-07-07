import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const AppRoutes = ({ setToken }) => {
  return <Routes>
    <Route path='/authors' element={<Authors />} />
    <Route path='/books' element={<Books />} />
    <Route path='/newBook' element={<NewBook />} />
    <Route path='/recommendations' element={<Recommendations />} />
    <Route path='/login' element={<LoginForm setToken={setToken} />} />
    <Route path="/" element={<div></div>} />
  </Routes>
}

export default AppRoutes