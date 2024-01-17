import { NewPatient, Gender, Entry, EntryWithoutId, NewBaseEntry, Diagnosis, 
    discharge, HealthCheckRating, sickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect of missing name');
    }

    return name;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect of missing specialist');
    }

    return specialist;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect of missing description');
    }

    return description;
};

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect of missing criteria');
    }

    return criteria;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }

    return dateOfBirth;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }

    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'occupation' in object &&
        'name' in object &&
        'ssn' in object &&
        'dateOfBirth' in object &&
        'gender' in object &&
        'entries' in object
    ) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries as Entry[]
        };

        return newPatient;
    }

    throw new Error('Incorrecct data: some fields are missing');
};

const isCorrectEntryType = (param: string): boolean => {
    const type = param.toString();

    if (
        type !== 'Hospital' &&
        type !== 'HealthCheck' &&
        type !== 'OccupationalHealthcare'
    ) throw new Error('Incorrecct data: wrong entry type');

    return true;
};

// const parseEntryType = (entryType: unknown): string => {
//     if (!entryType || !isString(entryType) || isCorrectEntryType(entryType)) {
//         throw new Error('Incorrect or missing entry type: ' + entryType);
//     }

//     return entryType;
// };

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};  
  
const parseDischarge = (object: unknown): discharge => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'date' in object &&
        'criteria' in object
    ) {
        const dischargeData: discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria)
        };

        return dischargeData;
    }

    throw new Error('Incorrecct data: some fields are missing');
};

const parseSickLeave = (object: unknown): sickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'startDate' in object &&
        'endDate' in object
    ) {
        const sickLeave: sickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };

        return sickLeave;
    }

    throw new Error('Incorrecct data: some fields are missing');
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(Number).includes(param);
  };
  

  const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    const numericRating = Number(healthCheckRating);
    
    if (isNaN(numericRating) || !isHealthCheckRating(numericRating)) {
      throw new Error('Invalid or missing health check rating');
    }
  
    return numericRating;
  };
  

const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (!('type' in object) || !isString(object.type) || !isCorrectEntryType(object.type)) {
        throw new Error('Incorrect or missing entry type');
    }

    const newEntry: NewBaseEntry = {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: []
    };

    if (
        'date' in object &&
        'specialist' in object &&
        'description' in object
    ) {
        newEntry.date = parseDate(object.date);
        newEntry.specialist = parseSpecialist(object.specialist);
        newEntry.description = parseDescription(object.description);
        
        if ('diagnosisCodes' in object) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(object);
        }
    }

    switch(object.type) {
        case 'Hospital':
            if ('discharge' in object) {
                const hospitalEntry: EntryWithoutId = {
                    ...newEntry,
                    type: object.type,
                    discharge: parseDischarge(object.discharge)
                };

                return hospitalEntry;
            } throw new Error('Incorrecct data: some fields are missing');

        case 'HealthCheck':
            if ('healthCheckRating' in object) {
                const healthCheckEntry: EntryWithoutId = {
                    ...newEntry,
                    type: object.type,
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                };

                return healthCheckEntry;
            } throw new Error('Incorrecct data: some fields are missing');
        
        case 'OccupationalHealthcare':
            if ('employerName' in object &&
                'sickLeave' in object
            ) {
                const healthCheckEntry: EntryWithoutId = {
                    ...newEntry,
                    type: object.type,
                    employerName: parseName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };

                return healthCheckEntry;
            } throw new Error('Incorrecct data: some fields are missing');

        default:
            throw new Error('Incorrecct data: unknown entry type');
    }
    
};

export default { toNewPatient, toNewEntry };