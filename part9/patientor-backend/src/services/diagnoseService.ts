import diagnoseData from '../../data/diagnoses.ts';
import { Diagnose } from '../types.ts';

const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const getDiagnose = (code: string): Diagnose | undefined => {
  const diagnose = diagnoses.find(p => p.code === code);
  return diagnose;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  getDiagnose,
  addDiagnose
};