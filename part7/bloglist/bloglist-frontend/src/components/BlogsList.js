import { Link } from 'react-router-dom'
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const BlogsList = ({blogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none',
  }

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
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