import  { useField } from '../hooks'
import { Input, Button } from '../styles'

const CreateNew = (props) => {
  const {onReset: resetContent, ...content} = useField('content')
  const {onReset: resetAuthor, ...author} = useField('author')
  const {onReset: resetInfo, ...info} = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
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
          <Input {...content} />
        </div>
        <div>
          author
          <Input {...author} />
        </div>
        <div>
          url for more info
          <Input {...info} />
        </div>
        <button>create</button>
      </form>
      <Button onClick={() => handleReset()}>reset</Button>
    </div>
  )
}

export default CreateNew