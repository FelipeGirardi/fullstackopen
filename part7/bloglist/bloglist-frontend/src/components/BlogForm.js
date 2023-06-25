import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notifReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const notifTime = 3000

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
    };
    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
    dispatch(addBlog(blogObject))
    dispatch(setNotification(`A new blog was added: ${blogObject.title} by ${blogObject.author}`, notifTime))
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title
        <input
          type="text"
          name="Title"
          placeholder="Blog title"
          id="blogTitle"
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="Author"
          placeholder="Blog author"
          id="blogAuthor"
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="Url"
          placeholder="Blog url"
          id="blogUrl"
        />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
