import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUserBlogs } from '../reducers/userBlogsReducer'

const UserBlogs = ({user}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUserBlogs(user))
  }, [dispatch])

  const currentUserBlogs = useSelector(state => {
    return state.userBlogs
  })
  const currUserBlogs = [...currentUserBlogs]

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
      {currUserBlogs
      .map((userBlog) => {
        return <li key={userBlog.id}>
          {userBlog.title}
        </li>
      }
      )}
      </ul>
    </div>
  )
}

export default UserBlogs