import { Link } from 'react-router-dom'
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { blogStyle } from '../styles'

const BlogsList = ({blogs}) => {
  return (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      &nbsp;
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => 
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </li>
        )}
    </div>
  )
}

export default BlogsList