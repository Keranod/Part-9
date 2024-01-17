import { SyntheticEvent, useState, useRef, useEffect } from "react";

import { InputLabel, Button, Select, SelectChangeEvent, MenuItem, TextField, Autocomplete } from '@mui/material';

import { Diagnosis, NewBaseEntry, EntryWithoutId, Patient } from "../../types";

import patientService from "../../services/patients";

const entryTypes: string[] = [
    'Hospital', 'Health Check', 'Occupational Healthcare'
];

interface addNewEntryProps {
    diagnoses: Diagnosis[],
    patientId: string,
    patient: Patient,
    setPatient: (newPatient: Patient) => void;
}

const AddNewEntry = ({ diagnoses, patientId, patient, setPatient }: addNewEntryProps) => {
    const [addEntryFormVisible, setAddEntryFormVisible] = useState<boolean>(false);

    const [selectedEntryType, setSelectedEntryType] = useState<string>(entryTypes[0]);
    const [entryDescription, setEntryDescription] = useState<string>('');
    const [entryDate, setEntryDate] = useState<string>('');
    const [entrySpecialist, setEntrySpecialist] = useState<string>('');
    const [selectedDiagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    
    const [hospitalEntryDischargeDate, setHospitalEntryDischargeDate] = useState<string>('');
    const [hospitalEntryDischargeCriteria, setHospitalEntryDischargeCriteria] = useState<string>('');
    
    const [employerName, setEmployerName] = useState<string>('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

    const [selectedHealthCheckRating, setSelectedHealthCheckRating] = useState<string | null>("0");

    const [errorMessage, setErrorMessage] = useState<string>('');
    const timeoutIdRef = useRef<number | null>(null);

    useEffect(() => {
        // Clear the existing timeout when a new error occurs
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
    
        if (errorMessage === '') return;
    
        timeoutIdRef.current = setTimeout(() => {
          setErrorMessage('');
        }, 5000);
    
        return () => {
          if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
          }
        };
      },[errorMessage]);

    const diagnosisCodes = diagnoses.map((diagnosis) => diagnosis.code);

    const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          
          switch(value) {
            case 'Hospital':
                setSelectedEntryType(value);
                break;

            case 'Health Check':
                setSelectedEntryType(value);
                break;

            case 'Occupational Healthcare':
                setSelectedEntryType(value);
                break;

            default:
                throw new Error('Unknown entry type');
          }
        }
      };
    
      const onNewEntryFormSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewBaseEntry = {
            description: entryDescription,
            date: entryDate,
            specialist: entrySpecialist,
            diagnosisCodes: selectedDiagnosisCodes
        };

        switch(selectedEntryType) {
            case 'Hospital':
                const dischargeObject = {
                    date: hospitalEntryDischargeDate,
                    criteria: hospitalEntryDischargeCriteria
                };

                const hospitalEntry: EntryWithoutId = {
                    ...newEntry,
                    type: selectedEntryType,
                    discharge: dischargeObject
                };

                try {
                    const entry = await patientService.addPatientEntry(hospitalEntry, patientId);
                    const updatedPatientEntries = patient.entries.concat(entry);
                    const updatedPatient = {
                        ...patient,
                        entries: updatedPatientEntries
                    };

                    setPatient(updatedPatient);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message);
                    }
                }
                break;
            
            case 'Occupational Healthcare':
                const sickLeaveobject = {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate
                };

                const occupationalHealthcareEntry: EntryWithoutId = {
                    ...newEntry,
                    type: 'OccupationalHealthcare',
                    employerName,
                    sickLeave: sickLeaveobject
                };

                try {
                    const entry = await patientService.addPatientEntry(occupationalHealthcareEntry, patientId);
                    const updatedPatientEntries = patient.entries.concat(entry);
                    const updatedPatient = {
                        ...patient,
                        entries: updatedPatientEntries
                    };

                    setPatient(updatedPatient);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message);
                    }
                }
                break;

            case 'Health Check':                
                const healthCheckEntry: EntryWithoutId = {
                    ...newEntry,
                    type: 'HealthCheck',
                    healthCheckRating: Number(selectedHealthCheckRating)
                };

                try {
                    const entry = await patientService.addPatientEntry(healthCheckEntry, patientId);
                    const updatedPatientEntries = patient.entries.concat(entry);
                    const updatedPatient = {
                        ...patient,
                        entries: updatedPatientEntries
                    };

                    setPatient(updatedPatient);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message);
                    }
                }
                break;
            
            default:
                setErrorMessage('Unknown entry type');
        }
      };

      const BaseEntryFields = () => {
        return(
            <div>
                <TextField
                    label='Description'
                    fullWidth
                    value={entryDescription}
                    onChange={({ target }) => setEntryDescription(target.value)}
                />
                <>Date:</>
                <input 
                    type='date' 
                    placeholder="YYYY-MM-DD" 
                    value={entryDate} 
                    onChange={({ target }) => setEntryDate(target.value)}
                />
                <TextField
                    label='Specialist'
                    fullWidth
                    value={entrySpecialist}
                    onChange={({ target }) => setEntrySpecialist(target.value)}
                />
                <Autocomplete
                    multiple
                    id="multiple-selection"
                    options={diagnosisCodes}
                    value={selectedDiagnosisCodes}
                    onChange={(_, newValue) => setDiagnosisCodes(newValue)}
                            isOptionEqualToValue={(option, value) => option === value}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Select diagnosis codes"
                                variant="outlined"
                                />
                            )}
                />
            </div>
        );
      };

      const HospitalEntryFields = () => {
        return(
            <div style={{ border: '1px dotted #000', padding: '10px', margin: '10px' }}>
                <p>Discharge info:</p>
                <>Discharge date:</>
                <input 
                    type='date' 
                    placeholder="YYYY-MM-DD" 
                    value={hospitalEntryDischargeDate} 
                    onChange={({ target }) => setHospitalEntryDischargeDate(target.value)}
                />
                <TextField
                    label='Criteria'
                    fullWidth
                    value={hospitalEntryDischargeCriteria}
                    onChange={({ target }) => setHospitalEntryDischargeCriteria(target.value)}
                />
            </div>
        );
      };

      const OccupationalHealthcareEntryFields = () => {
        return(
            <div style={{ border: '1px dotted #000', padding: '10px', margin: '10px' }}>
                <TextField
                    label='Employer Name'
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />
                <>Sick leave start date:</>
                <input 
                    type='date' 
                    placeholder="YYYY-MM-DD" 
                    value={sickLeaveStartDate} 
                    onChange={({ target }) => setSickLeaveStartDate(target.value)}
                /><br/>
                <>Sick leave end date:</>
                <input 
                    type='date' 
                    placeholder="YYYY-MM-DD" 
                    value={sickLeaveEndDate} 
                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                />
            </div>
        );
      };

      const HealthCheckEntryFields = () => {
        return(
            <div style={{ border: '1px dotted #000', padding: '10px', margin: '10px' }}>
                <Autocomplete
                    id="single-selection"  // Change the ID if needed
                    options={["0", "1", "2", "3"]}
                    value={selectedHealthCheckRating}
                    onChange={(_, newValue) => setSelectedHealthCheckRating(newValue)}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Select health check rating"
                        variant="outlined"
                        />
                    )}
                />
            </div>
        );
      };

    return (
        <div>
            <div>
                {errorMessage !== '' ? (
                <p style={{ color: 'red' }}>{errorMessage}</p>
                ) : (
                null
                )}
            </div>
            <Button variant="contained" onClick={() => setAddEntryFormVisible(!addEntryFormVisible)}>
            {
                addEntryFormVisible === false
                ? 'Add New Entry'
                : 'Close the form'
            }
            </Button>
            {
                addEntryFormVisible === true
                ? (<form style={{ border: '1px dotted #000', padding: '10px', margin: '10px' }} onSubmit={onNewEntryFormSubmit}>
                        <InputLabel>Select entry type:</InputLabel>
                        <Select label='entryType' value={selectedEntryType} onChange={onEntryTypeChange}>
                            {entryTypes.map(option =>
                                <MenuItem
                                key={option}
                                value={option}
                                >
                                    {option}
                                </MenuItem>
                            )}
                        </Select>
                        {/* Need to do below this way instead of <BaseEntryFields/> because it loses focus after each typed in letter */}
                        {BaseEntryFields()}
                        {
                            selectedEntryType === 'Hospital'
                            ? <>{HospitalEntryFields()}</>
                            : selectedEntryType === 'Occupational Healthcare'
                            ? <>{OccupationalHealthcareEntryFields()}</>
                            : selectedEntryType === 'Health Check'
                            ? <>{HealthCheckEntryFields()}</>
                            : null
                        }
                        <Button
                        type="submit"
                        variant="contained"
                        >Submit</Button>
                    </form>)
                : null
            }
        </div>
    );
};

export default AddNewEntry;