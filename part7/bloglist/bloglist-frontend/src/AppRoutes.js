import { Routes, Route, useMatch } from 'react-router-dom'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import UsersList from './components/UsersList'
import UserBlogs from './components/UserBlogs'

const AppRoutes = ({blogs, users}) => {
  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
  ? blogs.find(blg => blg.id === matchBlog.params.id)
  : null

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find(usr => usr.id === matchUser.params.id)
    : null

  return (
    <Routes>
      <Route path='/blogs' element={<BlogsList blogs={blogs} />} />
      <Route path='/blogs/:id' element={<Blog blog={blog} />} />
      <Route path='/users' element={<UsersList users={users} />} />
      <Route path='/users/:id' element={<UserBlogs user={user} />} />
      <Route path='/' element={<div></div>} />
    </Routes>
  )
}

export default AppRoutes