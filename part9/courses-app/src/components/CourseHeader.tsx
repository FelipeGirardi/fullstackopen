import { CourseNameProps } from "../types"

const CourseHeader = (props: CourseNameProps) => {
  return <h1>{props.courseName}</h1>
}

export default CourseHeader;