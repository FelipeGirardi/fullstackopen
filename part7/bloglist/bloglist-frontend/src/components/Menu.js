import { Link } from 'react-router-dom'

const Menu = ({username, handleLogout}) => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <p>{username} logged in</p>
        <button id="logoutButton" onClick={handleLogout}>
          logout
        </button>
      </div>
  )
}

export default Menu