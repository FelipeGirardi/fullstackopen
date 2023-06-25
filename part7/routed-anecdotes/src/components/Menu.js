import { Link } from 'react-router-dom'
import { Navigation } from '../styles'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <Navigation>
        <Link style={padding} to='/anecdotes'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </Navigation>
  )
}

export default Menu