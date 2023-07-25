import { Diagnose, Entry } from "../../types";

type EntryDetailsProps = {
  entry: Entry;
  diagnoses: Diagnose[] | null;
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  return <div>
    {entry.date}
    {' '}
    <i>{entry.description}</i>
    <ul>
      {!entry.diagnosisCodes ? null : (entry.diagnosisCodes.map(code => (
        <li key={code}>
          {code}
          {' '}
          {!diagnoses ? null : diagnoses.find((d) => d.code === code)?.name}
        </li>
      )
      ))}
    </ul>
  </div>
}

export default EntryDetails;