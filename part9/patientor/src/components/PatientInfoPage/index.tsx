import { Gender, Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientInfoPage = () => {
  const patientId = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatientData = async () => {
      const patientData = await patientService.getPatient(patientId as string);
      setPatient(patientData);
    };

    getPatientData();
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
      <ul style={{listStyle:'none', padding: 0}}>
        <li>ssh: {patient.ssn}</li>
        {' '}
        <li>occupation: {patient.occupation}</li>
      </ul>
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