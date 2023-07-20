import { CoursePartsProps } from "../types"

const CourseTotal = (props: CoursePartsProps) => {
  const courseParts = props.courseParts;
  return <div>
    <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  </div>
}

export default CourseTotal;