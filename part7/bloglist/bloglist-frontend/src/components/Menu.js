import { Link } from 'react-router-dom'
import { MainMenu } from '../styles'

const Menu = ({username, handleLogout}) => {
  const padding = {
    paddingRight: 5
  }
  return (
      <MainMenu>
        <div>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
        </div>
        &nbsp;
        <div>
          {username} is logged in
          &nbsp;
          <button id="logoutButton" onClick={handleLogout}>
            logout
          </button>
        </div>
      </MainMenu>
  )
}

export default Menu