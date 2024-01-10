import data from '../../data/patients';
import { Patient, PatientWithoutSsn, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const id: string = uuid();

const Patients: Patient[] = data as Patient[];

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

export default {
    getPatients,
    getPatientsWithoutSsn,
    getPatientWithId,
    addPatient
};