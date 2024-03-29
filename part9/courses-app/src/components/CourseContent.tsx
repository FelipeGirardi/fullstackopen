import { CoursePart } from "../types"
import Part from "./Part";

const CourseContent = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return <div>
    {courseParts.map(part => 
      <Part key={part.name} part={part} />
    )}
  </div>
}

export default CourseContent;