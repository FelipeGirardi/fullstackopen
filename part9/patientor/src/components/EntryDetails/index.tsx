import { Diagnose, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

type EntryDetailsProps = {
  entry: Entry;
  diagnoses: Diagnose[] | null;
}

type HealthCheckEntryDetailsProps = {
  entry: HealthCheckEntry;
}

type HospitalEntryDetailsProps = {
  entry: HospitalEntry;
}

type OccupationalHealthcareEntryDetailsProps = {
  entry: OccupationalHealthcareEntry;
}

    // eslint-disable-next-line no-lone-blocks
    {/* <ul>
      {!entry.diagnosisCodes ? null : (entry.diagnosisCodes.map(code => (
        <li key={code}>
          {code}
          {' '}
          {!diagnoses ? null : diagnoses.find((d) => d.code === code)?.name}
        </li>
      )
      ))}
    </ul> */}

const HealthCheckDetails = ({ entry }: HealthCheckEntryDetailsProps) => {
  return <div style={{border: '1px solid black', borderRadius: '5px', padding: '10px'}}>
    <div>
      {entry.date}
      {' '}
      <VerifiedUserIcon />
    </div>
    <i>{entry.description}</i>
    <div><FavoriteIcon style={{ color: 
      entry.healthCheckRating === 0 ? 'green' : 
      entry.healthCheckRating === 1 ? 'yellow' :
      entry.healthCheckRating === 2 ? 'orange' : 'red'}} /></div>
    <div>diagnose by {entry.specialist}</div>
  </div>
}

const HospitalDetails = ({ entry }: HospitalEntryDetailsProps) => {
  return <div style={{border: '1px solid black', borderRadius: '5px', padding: '10px'}}>
    <div>
      {entry.date}
      {' '}
      <LocalHospitalIcon />
    </div>
    <i>{entry.description}</i>
    <div>{entry.discharge.criteria}</div>
    <div>diagnose by {entry.specialist}</div>
  </div>
}

const OccupationalHealthcareDetails = ({ entry }: OccupationalHealthcareEntryDetailsProps) => {
  return <div style={{border: '1px solid black', borderRadius: '5px', padding: '10px'}}>
    <div>
      {entry.date}
      {' '}
      <MedicalInformationIcon />
      {' '}
      {entry.employerName}
    </div>
    <i>{entry.description}</i>
    <div>diagnose by {entry.specialist}</div>
  </div>
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />
    case "Hospital":
      return <HospitalDetails entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />
  }
}

export default EntryDetails;