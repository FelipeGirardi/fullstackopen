import { useDispatch } from 'react-redux'
import { likeBlog, deleteABlog } from "../reducers/blogsReducer"
import CommentsList from './CommentsList'

const Blog = ({ blog }) => {
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={{ display: "flex" }} className="short">
        {" "}
        <h2>{blog.title} - {blog.author}</h2>
        &nbsp;
      </div>

      <div className="long">
        <div className="url"><a href={blog.url}>{blog.url}</a></div>
        <div id="likes" className="likes">
          likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog.id)} id="likeButton">
            like
          </button>
        </div>
        <div className="username">added by {blog.user.name}</div>
        <div>
          <button
            id="deleteButton"
            style={{ backgroundColor: "cyan" }}
            onClick={() => deleteBlog(blog)}
          >
            remove
          </button>
        </div>
      </div>

      <CommentsList blog={blog}/>
    </div>
  );
};

export default Blog;
