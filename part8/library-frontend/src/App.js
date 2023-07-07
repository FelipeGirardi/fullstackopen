import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import AppRoutes from './AppRoutes'

const App = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        {!token
          ? <button onClick={() => navigate('/login')}>login</button>
          : <div>
              <button onClick={() => navigate('/newBook')}>add book</button>
              <button onClick={() => navigate('/recommendations')}>recommendations</button>
              <button onClick={logout}>logout</button>
            </div>
        }
      </div>
      &nbsp;
      <AppRoutes setToken={setToken} />
    </div>
  )
}

export default App
