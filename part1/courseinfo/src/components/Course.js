const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ sum }) => <h4>Total of {sum} exercises</h4>

const Part = ({ part }) => 
  <li>
    {part.name} {part.exercises}
  </li>

const Content = ({ parts }) =>
  <>
    <ul>
      {parts.map(part => 
      <Part key={part.id} part={part} />
        )}
    </ul>
  </>

const Course = ({ course }) => {
  const parts = course.parts
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total sum={total} />
  </>
  )
}

export default Course