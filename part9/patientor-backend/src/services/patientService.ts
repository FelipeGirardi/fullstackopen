import patientData from '../../data/patients.ts';
import { Patient, NoSSNPatient, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNoSSNPatients,
  getPatient,
  addPatient
};