import { Diagnose, Gender, Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnose";
import EntryDetails from "../EntryDetails/index";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button } from '@mui/material';

const PatientInfoPage = () => {
  const patientId = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[] | null>(null);

  useEffect(() => {
    const getPatientData = async () => {
      const patientData = await patientService.getPatient(patientId as string);
      setPatient(patientData);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    getPatientData();
    fetchDiagnoses();
  }, [patientId]);

  if (patient) {
    return (
    <div>
      <h1><b>Patientor</b></h1>
      {' '}
      <div style={{display: 'flex'}}>
        <h2><b>{patient.name}</b></h2>
        {patient.gender === Gender.Female ? <FemaleIcon /> : <MaleIcon />}
      </div>

      <div style={{paddingBottom: '10px'}}>
        <div>ssh: {patient.ssn}</div>
        <div><i>occupation: {patient.occupation}</i></div>
      </div>

      <div>
        {patient.entries.length === 0 ? <div></div> : <h2>Entries</h2>}
        {patient.entries.map(entry =>
        <div key={entry.id} style={{marginBottom: '10px'}}>
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        </div>
        )}
      </div>

      <div style={{paddingTop: '10px'}}><Button
        style={{
          float: "left",
        }}
        type="submit"
        variant="contained"
      >
        Add new entry
      </Button>
      </div>
    </div>
    );
  } else {
    return(
      <div>
        No patient found
      </div>
    )
  }
};

export default PatientInfoPage;