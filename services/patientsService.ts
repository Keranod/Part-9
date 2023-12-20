import data from '../data/patients';
import { Patient, PatientWithoutSsn } from '../src/types';

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

export default {
    getPatients,
    getPatientsWithoutSsn
};