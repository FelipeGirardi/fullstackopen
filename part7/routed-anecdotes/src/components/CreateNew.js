import  { useField } from '../hooks'

const CreateNew = (props) => {
  const {onReset: resetContent, ...content} = useField('content')
  const {onReset: resetAuthor, ...author} = useField('author')
  const {onReset: resetInfo, ...info} = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => handleReset()}>reset</button>
    </div>
  )
}

export default CreateNew