import express from 'express';
import patientsService from '../services/patientsService';
import utils from '../utils';

const toNewPatient = utils.toNewPatient;
const toNewEntry = utils.toNewEntry;

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.send(patientsService.getPatientsWithoutSsn());
});

patientsRouter.get('/:id', (req, res) => {
    res.send(patientsService.getPatientWithId(req.params.id));
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + errorMessage;
        }
        res.status(400).send(errorMessage);
    }
});

patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);

        const patientId = req.params.id;

        const addedEntry = patientsService.addEntry(patientId, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + errorMessage;
        }
        res.status(400).send(errorMessage);
    }
});

export default patientsRouter;