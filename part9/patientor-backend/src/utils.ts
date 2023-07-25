import { NewPatient, Gender, Entry } from './types';

const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
   
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object && Array.isArray(object.entries)) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries)
    };
  
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect or missing comment');
  }

  return str;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseEntries = (entries: unknown[]): Entry[] => {
  if(Array.isArray(entries)) {
    entries.forEach(entry => {
      if (!isEntry(entry as object)) {
        throw new Error('Incorrect entry');
      }
    });
  
    return entries as Entry[];
  }
  throw new Error('Incorrect entry');
};

const isEntry = (entry: object): entry is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return 'type' in entry && isString(entry.type) && ["HealthCheck","OccupationalHealthcare","Hospital"].includes(entry.type);
};

export default toNewPatient;