import { Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const AppRoutes = () => {
  return <Routes>
    <Route path='/authors' element={<Authors />} />
    <Route path='/books' element={<Books />} />
    <Route path='/newBook' element={<NewBook />} />
    <Route path="/" element={<div></div>} />
  </Routes>
}

export default AppRoutes