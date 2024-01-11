import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { Patient } from "../../types";

import patientService from "../../services/patients";

const PatientDetailsPage = () => {
    const [patientWithId, setPatientWithId] = useState<Patient>();

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

            void getPatient();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
      },);

    if (patientWithId === undefined) {
        return (
            <p>Loading patient data...</p>
        );
    }

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
            <h2>entries</h2>
            {
                patientWithId.entries.length === 0
                ? <p>No entires</p>
                : patientWithId.entries.map(entry => (
                    <div key={entry.id}>
                        <p>{entry.date} <i>{entry.description}</i></p>
                        {
                            entry.diagnosisCodes?.length === 0 
                            ? <p>No diagnoses</p>
                            : (
                                <ul>
                                    {entry.diagnosisCodes?.map(diagnose => (
                                        <li key={diagnose}>{diagnose}</li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default PatientDetailsPage;