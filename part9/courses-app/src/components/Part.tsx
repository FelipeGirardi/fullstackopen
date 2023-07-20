import { CoursePart } from "../types"

const Part = ({ part }: { part: CoursePart }) => {
    switch(part.kind) {
      case "basic":
        return(
          <ul style={{listStyleType: 'none', padding: 0}}>
            <li><b>{part.name} {part.exerciseCount}</b></li>
            <li><i>{part.description}</i></li>
            <li>{part.kind}</li>
          </ul>
        );
      case "group":
        return(
          <ul style={{listStyleType: 'none', padding: 0}}>
            <li><b>{part.name} {part.exerciseCount} </b></li>
            <li>{part.groupProjectCount}</li>
            <li>{part.kind}</li>
          </ul>
        );
      case "background":
        return(
          <ul style={{listStyleType: 'none', padding: 0}}>
            <li><b>{part.name} {part.exerciseCount}</b></li>
            <li><i>{part.description}</i></li>
            <li>{part.backgroundMaterial}</li>
            <li>{part.kind}</li>
          </ul>
        );
      default:
        return assertNever(part);
    }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;