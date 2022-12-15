import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const nGood = props.good
  const nNeutral = props.neutral
  const nBad = props.bad

  if (nGood === 0 && nNeutral === 0 && nBad === 0) {
    return <p>No feedback</p>
  }
  return (
    <>
    <Stat text="good" stat={nGood} />
      <Stat text="neutral" stat={nNeutral} />
      <Stat text="bad" stat={nBad} />
      <Stat text="all" stat={nGood+nNeutral+nBad} />
      <Stat text="average" stat={(nGood-nBad)/(nGood+nNeutral+nBad)} />
      <Stat text="positive" stat={`${(nGood/(nGood+nNeutral+nBad))*100} %`} />
    </>
  )
}

const Stat = props => <div>{props.text} {props.stat}</div>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p>give feedback</p>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <p>statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App