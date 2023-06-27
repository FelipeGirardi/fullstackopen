import { useDispatch } from 'react-redux'
import { commentToBlog } from "../reducers/blogsReducer"

const CommentsList = ({blog}) => {
  const dispatch = useDispatch()

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.Comment.value
    event.target.Comment.value = ''
    try {
      dispatch(commentToBlog(blog.id, comment))
    } catch (exception) {
      console.log("Could not comment blog")
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <form onSubmit={handleComment}>
          <input
              type="text"
              name="Comment"
              placeholder="Comment"
              id="comment"
            />
          <button id="create-comment" type="submit">
            Add comment
          </button>
        </form>
      </div>

      <ul>
      {blog.comments
        .map((comment, index) => 
          <li key={index}>
            {comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CommentsList