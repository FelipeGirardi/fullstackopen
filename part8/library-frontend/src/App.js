import { useNavigate } from 'react-router-dom'
import AppRoutes from './AppRoutes'

const App = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        <button onClick={() => navigate('/newBook')}>add book</button>
      </div>
      &nbsp;
      <AppRoutes />
    </div>
  )
}

export default App
