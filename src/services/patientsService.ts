import data from '../../data/patients';
import { Patient, PatientWithoutSsn, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const id: string = uuid();

const Patients: Patient[] = data as Patient[];

const getPatients = (): Patient[] => {
    return Patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return Patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
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
    addPatient
};