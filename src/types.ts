export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface BaseEntryWithDescription extends BaseEntry {
    description: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

type discharge = {
    date: string;
    criteria: string;
};

interface HospitalEntry extends BaseEntryWithDescription {
    type: 'Hospital';
    discharge: discharge;
}

type sickLeave = {
    startDate: string;
    endDate: string;
};

interface OccupationalHealthcareEntry extends BaseEntryWithDescription {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: sickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
};

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;