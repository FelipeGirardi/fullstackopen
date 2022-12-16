import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const AnectodeAndVotes = (props) => (
  <>
    <p>{props.anecdote}</p>
    <p>has {props.nVotes} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setVotes] = useState(new Uint8Array(7))
  const [mostVotes, setMostVotes] = useState(0)

  const vote = () => {
    const newVotes = [...allVotes]
    newVotes[selected] += 1
    setVotes(newVotes)

    if (newVotes[selected] > newVotes[mostVotes]) {
      setMostVotes(selected)
    }
  }
  const selectRandomNum = () => setSelected(Math.floor(Math.random() * 7))

  return (
    <div>
      <h1>Anectode of the day</h1>
      <AnectodeAndVotes anecdote={anecdotes[selected]} nVotes={allVotes[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={selectRandomNum} text="next anectode" />
      <h1>Anectode with most votes</h1>
      <AnectodeAndVotes anecdote={anecdotes[mostVotes]} nVotes={allVotes[mostVotes]} />
    </div>
  )
}

export default App