import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteABlog } from "../reducers/blogsReducer";
import Blog from "./Blog"

const BlogsList = () => {
  const currentBlogs = useSelector(state => {
    return state.blogs
  })
  const currBlogs = [...currentBlogs]
  const dispatch = useDispatch()

  const handleLike = async (id) => {
    try {
      dispatch(likeBlog(id))
    } catch (exception) {
      console.log("Could not like blog")
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title}?`)) {
        dispatch(deleteABlog(blog.id))
      }
    } catch (exception) {
      console.log("Could not delete blog")
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {currBlogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default BlogsList