import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import WorkIcon from '@mui/icons-material/Work';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

import AddNewEntry from "./AddNewEntry";

import { Patient, Diagnosis, Entry } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from '../../services/diagnoses';

const PatientDetailsPage = () => {
    const [patientWithId, setPatientWithId] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        try {
            if (id === undefined) {
                throw new Error('id for specific user is not a string');
            }

            const getPatient = async () => {
                const patient = await patientService.getPatientWithId(id);
                setPatientWithId(patient);
            };

            const getDianoses = async () => {
                const diagnosesFromEndpoint = await diagnosesService.getAll();
                setDiagnoses(diagnosesFromEndpoint);
            };

            void getPatient();
            void getDianoses();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
      }, [id]);

    if (patientWithId === undefined) {
        return (
            <p>Loading patient data...</p>
        );
    }

    if (diagnoses === undefined) {
        return (
            <p>Loading diagnoses data...</p>
        );
    }

    interface entryDiagnosesProps {
        entry : Entry
        diagnoses: Diagnosis[]
    }

    const EntryDiagnoses = ({ entry, diagnoses }: entryDiagnosesProps) => {
        return (
            <div>
                {entry.diagnosisCodes?.length === 0 
                            ? <p>No diagnoses</p>
                            : (
                                <ul>
                                    {entry.diagnosisCodes?.map(diagnose => (
                                        <li key={diagnose}>
                                            {diagnose}
                                            {' '}
                                            {diagnoses.find(d => d.code === diagnose)?.name}
                                        </li>
                                    ))}
                                </ul>
                            )
                }
            </div>
        );
    };

    interface EntryDetailsProps {
        entry: Entry;
    }

    const EntryDetails = ({ entry }: EntryDetailsProps) => {
        return (
            <div style={{ border: '1px solid #000', padding: '10px', margin: '10px' }}>
                <div>
                    {entry.date} 
                    {
                        entry.type === 'OccupationalHealthcare'
                        ? (<><WorkIcon/> {entry.employerName}</>)
                        : entry.type === 'HealthCheck'
                        ? (<>
                            <MedicalInformationIcon/>
                            <p>
                                {entry.healthCheckRating === 0
                                ? <FavoriteIcon style={{ color: 'green' }}/>
                                : entry.healthCheckRating === 1
                                ? <FavoriteIcon style={{ color: 'yellow' }}/>
                                : entry.healthCheckRating === 2
                                ? <FavoriteIcon style={{ color: 'pink' }}/>
                                : entry.healthCheckRating === 3
                                ? <FavoriteIcon style={{ color: 'red' }}/>
                                : <>Error</>
                                }
                            </p>
                            </>
                        )
                        : entry.type === 'Hospital'
                        ? <LocalHospitalIcon/>
                        : <>Error</>
                    }
                </div>
                <i>{entry.description}</i>
                <EntryDiagnoses entry={entry} diagnoses={diagnoses}/>
                <p>diagnose by {entry.specialist}</p>
            </div>
        );
    };

    return (
        <div>
            <h1>
                {patientWithId.name}
                {
                    patientWithId.gender === 'male'
                    ? <MaleIcon/>
                    : patientWithId.gender === 'female'
                    ? <FemaleIcon/>
                    : <QuestionMarkIcon />
                }
            </h1>
            ssh: {patientWithId.ssn}<br/>
            occupation: {patientWithId.occupation}
            <AddNewEntry 
                diagnoses={diagnoses} 
                patientId={patientWithId.id}
                patient={patientWithId}
                setPatient={setPatientWithId}
            />
            <h2>entries</h2>
            {
                patientWithId.entries.length === 0
                ? <p>No entires</p>
                : patientWithId.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry}/>
                ))
            }
        </div>
    );
};

export default PatientDetailsPage;