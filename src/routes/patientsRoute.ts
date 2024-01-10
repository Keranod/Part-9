import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

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

export default patientsRouter;