import { useDispatch } from 'react-redux'
import { likeBlog, deleteABlog } from "../reducers/blogsReducer"
import CommentsList from './CommentsList'
import { MarginDiv } from '../styles';

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
        <h3>{blog.title} - {blog.author}</h3>
        &nbsp;
      </div>

      <div className="long">
        <MarginDiv className="url" style={{paddingTop: 3}}><a href={blog.url}>{blog.url}</a></MarginDiv>
        <MarginDiv id="likes" className="likes">
          likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog.id)} id="likeButton">
            like
          </button>
        </MarginDiv>
        <MarginDiv className="username">added by {blog.user.name}</MarginDiv>
        <MarginDiv>
          <button id="deleteButton" onClick={() => deleteBlog(blog)}>
            remove
          </button>
        </MarginDiv>
      </div>
      &nbsp;
      <CommentsList blog={blog}/>
    </div>
  );
};

export default Blog;
