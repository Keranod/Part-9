import patients from '../../data/patients';
import { Patient, PatientWithoutSsn, NewPatient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const id: string = uuid();

const Patients: Patient[] = patients;

const getPatients = (): Patient[] => {
    return Patients;
};

const getPatientWithId = (id: string): Patient | undefined=> {
    const patientWithId = Patients.find(patient => patient.id === id);

    if (!patientWithId?.entries && patientWithId !== undefined) {
        patientWithId.entries = [];
    }

    return Patients.find(patient => patient.id === id);
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return Patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient: Patient = {
        id,
        ...patient
    };

    Patients.push(newPatient);
    return newPatient;
};


// somehow get which patient is going to have this entry added and how to add it to that 
// patient entries list

// send patient id as well as entry in the arguments
const addEntry = ( patientId: string, entry: EntryWithoutId ): Entry => {
    const newEntry: Entry = {
        id: uuid(),
        ...entry
    };

    const patientIndex = Patients.findIndex((patient) => patient.id === patientId);

    if (patientIndex !== -1) {
        patients[patientIndex].entries.push(newEntry);

        return newEntry;
    }

    throw new Error(`Patient with id ${patientId} not found.`);
};

export default {
    getPatients,
    getPatientsWithoutSsn,
    getPatientWithId,
    addPatient,
    addEntry
};